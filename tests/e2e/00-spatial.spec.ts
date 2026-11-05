import { expect, test } from "@playwright/test";

test("3D Studio camera presets, world-space inspection and point distance measurements work", async ({ page }) => {
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") console.log(`[browser ${message.type()}] ${message.text()}`);
  });
  page.on("pageerror", (error) => console.log(`[browser pageerror] ${error.stack ?? error.message}`));
  await page.goto("/studio-3d");
  await expect(page.locator("canvas").first()).toBeVisible();

  // Diagnose renderer startup independently from the model loader. Three.js r163+
  // requires WebGL2; a WebGL1 context alone is not sufficient evidence of support.
  const rendererDiagnostics = await page.locator("canvas").first().evaluate((canvas) => {
    const describe = (gl: WebGLRenderingContext | WebGL2RenderingContext | null) => {
      if (!gl) return { available: false };
      const debug = gl.getExtension("WEBGL_debug_renderer_info");
      return {
        available: true,
        version: gl.getParameter(gl.VERSION),
        shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
        renderer: debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : "debug renderer extension unavailable",
        vendor: debug ? gl.getParameter(debug.UNMASKED_VENDOR_WEBGL) : "debug renderer extension unavailable",
        contextAttributes: gl.getContextAttributes(),
        contextLost: gl.isContextLost()
      };
    };
    const actualCanvas = canvas as HTMLCanvasElement;
    const webgl2Probe = document.createElement("canvas");
    const webgl1Probe = document.createElement("canvas");
    return {
      canvas: {
        width: actualCanvas.width,
        height: actualCanvas.height,
        onCreatedMarker: actualCanvas.getAttribute("role"),
        ariaLabel: actualCanvas.getAttribute("aria-label"),
        context: describe(actualCanvas.getContext("webgl2"))
      },
      freshWebgl2: describe(webgl2Probe.getContext("webgl2")),
      freshWebgl1: describe(webgl1Probe.getContext("webgl"))
    };
  }).catch((error: unknown) => ({ diagnosticError: error instanceof Error ? error.message : String(error) }));
  console.log("[spatial renderer diagnostics]", JSON.stringify(rendererDiagnostics));

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
  // React Three Fiber places its fallback node inside the <canvas> element.
  // It remains in the DOM as native canvas fallback content even when WebGL works,
  // so asserting that the node is absent would incorrectly fail healthy renderers.
  await expect(page.locator("canvas").first()).toHaveAttribute("role", "application");
  if (!("canvas" in rendererDiagnostics)) {
    throw new Error(`WebGL renderer diagnostics failed: ${rendererDiagnostics.diagnosticError}`);
  }
  expect(rendererDiagnostics).toMatchObject({
    canvas: {
      onCreatedMarker: "application",
      context: { available: true, contextLost: false }
    }
  });
  expect(rendererDiagnostics.canvas.context.version).toContain("WebGL 2.0");
  // Poll the actual hierarchy state and include the import error panel in the
  // failure payload. This distinguishes a loader failure from a stale/early
  // locator assertion without weakening the expected hierarchy requirement.
  await expect.poll(async () => JSON.stringify({
    hierarchy: await page.locator(".studio-node-tree").innerText().catch(() => "<missing tree>"),
    importError: await page.locator(".studio-error").allInnerTexts(),
    pageText: (await page.locator("body").innerText()).slice(-1800)
  }), { timeout: 5000 }).toContain("Reference A");
  await expect(page.getByRole("button", { name: /Reference A/ })).toBeVisible();
  await expect(page.getByRole("button", { name: "Front view" })).toBeVisible();
  await page.getByRole("button", { name: "Top view" }).click();
  await page.getByRole("button", { name: "Isometric view" }).click();
  await page.getByRole("button", { name: /Reference A/ }).click();
  await expect(page.getByText(/World position: 3\\.000, 2\\.000, 3\\.000/)).toBeVisible();
  await page.getByRole("button", { name: "Set measurement start" }).click();
  await page.getByRole("button", { name: /Reference B/ }).click();
  await expect(page.getByText(/Distance from Reference A: 4\\.000 m/)).toBeVisible();
  await page.getByRole("button", { name: "Focus selected" }).click();
  await page.getByRole("button", { name: "Reset 3D viewport camera" }).click();
});
