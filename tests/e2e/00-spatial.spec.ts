import { expect, test } from "@playwright/test";

test("3D Studio camera presets, world-space inspection and point distance measurements work", async ({ page }) => {
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") console.log(`[browser ${message.type()}] ${message.text()}`);
  });
  page.on("pageerror", (error) => console.log(`[browser pageerror] ${error.stack ?? error.message}`));
  await page.goto("/studio-3d");
  // Use real, embedded triangle geometry so the spatial inspector can measure
  // finite world-space bounds while exercising transformed child nodes.
  const positions = Buffer.from(new Float32Array([
    0, 0, 0,
    1, 0, 0,
    0, 1, 0
  ]).buffer);
  const model = {
    asset: { version: "2.0" },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [
      { name: "Assembly", translation: [2, 0, 0], children: [1, 2] },
      { name: "Reference A", translation: [1, 2, 3], mesh: 0 },
      { name: "Reference B", translation: [5, 2, 3], mesh: 0 }
    ],
    meshes: [{ primitives: [{ attributes: { POSITION: 0 } }] }],
    accessors: [{
      bufferView: 0,
      componentType: 5126,
      count: 3,
      type: "VEC3",
      min: [0, 0, 0],
      max: [1, 1, 0]
    }],
    bufferViews: [{ buffer: 0, byteOffset: 0, byteLength: positions.length }],
    buffers: [{ byteLength: positions.length, uri: `data:application/octet-stream;base64,${positions.toString("base64")}` }]
  };
  await page.locator("#studio-model-file").setInputFiles({
    name: "spatial-analysis.gltf",
    mimeType: "model/gltf+json",
    buffer: Buffer.from(JSON.stringify(model))
  });
  await expect(page.getByText("LOCAL MODEL", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Scene hierarchy" })).toBeVisible();
  // Capture renderer failures explicitly rather than mistaking an unpopulated hierarchy
  // for a slow GLTF load.
  await expect(page.locator(".studio-canvas-error")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /Reference A/ })).toBeVisible();
  await expect(page.getByRole("button", { name: "Front view" })).toBeVisible();
  await page.getByRole("button", { name: "Top view" }).click();
  await page.getByRole("button", { name: "Isometric view" }).click();
  await page.getByRole("button", { name: /Reference A/ }).click();
  await expect(page.getByText(/World position: 3\.000, 2\.000, 3\.000/)).toBeVisible();
  await page.getByRole("button", { name: "Set measurement start" }).click();
  await page.getByRole("button", { name: /Reference B/ }).click();
  await expect(page.getByText(/Distance from Reference A: 4\.000 m/)).toBeVisible();
  await page.getByRole("button", { name: "Focus selected" }).click();
  await page.getByRole("button", { name: "Reset 3D viewport camera" }).click();
});
