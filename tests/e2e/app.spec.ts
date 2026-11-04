import { expect, test } from "@playwright/test";

test("opens the SPECTRA foundation dashboard", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/SPECTRA/);
  await expect(page.getByRole("heading", { name:/GLOBAL DEFENCE SYSTEMS/i })).toBeVisible();
  await expect(page.getByText("Explore the divisions")).toBeVisible();
  await expect(page.getByText("10", { exact:true }).first()).toBeVisible();
});

test("catalogue shows the curated equipment records", async ({ page }) => {
  await page.goto("/catalogue");
  await expect(page.getByRole("heading", { name:"Equipment catalogue" })).toBeVisible();
  await expect(page.getByRole("heading", { name:"Arjun Main Battle Tank Mk IA" })).toBeVisible();
  await expect(page.getByRole("heading", { name:"Mogami-Class Multi-Mission Frigate" })).toBeVisible();
});

test("country and domain filters narrow the catalogue", async ({ page }) => {
  await page.goto("/catalogue");
  await page.getByLabel("Country").selectOption("IN");
  await expect(page.getByRole("heading", { name:"Arjun Main Battle Tank Mk IA" })).toBeVisible();
  await expect(page.getByRole("heading", { level:3, name:"Light Combat Aircraft (LCA) Tejas" })).toBeVisible();
  await expect(page.getByRole("heading", { name:"M1 Abrams Main Battle Tank" })).toHaveCount(0);
});

test("equipment profile presents provenance and source links", async ({ page }) => {
  await page.goto("/equipment/lca-tejas");
  await expect(page.locator("h1", { hasText:"Light Combat Aircraft (LCA) Tejas" })).toBeVisible();
  await expect(page.getByRole("heading", { name:"References & verification" })).toBeVisible();
  await expect(page.getByRole("link", { name:/Open source/i })).toBeVisible();
});

test("country profile lists associated sample records", async ({ page }) => {
  await page.goto("/countries/JP");
  await expect(page.getByRole("heading", { name:"Japan" })).toBeVisible();
  await expect(page.getByRole("heading", { name:"Mogami-Class Multi-Mission Frigate" })).toBeVisible();
  await expect(page.getByRole("heading", { name:"Type 10 Main Battle Tank" })).toBeVisible();
});

test("comparison supports up to three selected equipment records", async ({ page }) => {
  await page.goto("/catalogue");
  await page.getByLabel("Add Arjun Main Battle Tank Mk IA to comparison").check();
  await page.getByLabel("Add M1 Abrams Main Battle Tank to comparison").check();
  await expect(page.getByRole("heading", { name:"Compare selected records" })).toBeVisible();
  await expect(page.getByRole("columnheader", { name:"Arjun Main Battle Tank Mk IA" })).toBeVisible();
  await expect(page.getByRole("columnheader", { name:"M1 Abrams Main Battle Tank" })).toBeVisible();
});

test("global search finds equipment as well as divisions", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("searchbox", { name:"Search SPECTRA divisions and equipment" }).fill("Mogami");
  await page.getByRole("searchbox", { name:"Search SPECTRA divisions and equipment" }).press("Enter");
  await expect(page.getByRole("heading", { name:"Mogami-Class Multi-Mission Frigate" })).toBeVisible();
});

test("theme preference can be changed", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Visual theme").selectOption("contrast");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "contrast");
});

test("3D Studio opens with the educational demonstration model", async ({ page }) => {
  await page.goto("/studio-3d");
  await expect(page.locator("h1", { hasText:"3D Studio" })).toBeVisible();
  await expect(page.getByText("DEMONSTRATION SCENE")).toBeVisible();
  await expect(page.getByRole("heading", { name:"Explore features" })).toBeVisible();
  await expect(page.getByLabel("Select 3D model")).toHaveAttribute("accept", /glb/);
  await expect(page.getByText(/Educational use only/)).toBeVisible();
});

test("3D Studio rejects an invalid local model before rendering", async ({ page }) => {
  await page.goto("/studio-3d");
  await page.locator("#studio-model-file").setInputFiles({
    name:"invalid.glb", mimeType:"model/gltf-binary", buffer:Buffer.from("not a glb")
  });
  await expect(page.getByRole("alert")).toContainText("GLB header is invalid");
});

test("3D Studio rejects models that exceed the geometry complexity budget", async ({ page }) => {
  await page.goto("/studio-3d");
  const document = { asset:{ version:"2.0" }, nodes:Array.from({ length:2501 }, () => ({})) };
  await page.locator("#studio-model-file").setInputFiles({
    name:"too-many-nodes.gltf", mimeType:"model/gltf+json", buffer:Buffer.from(JSON.stringify(document))
  });
  await expect(page.getByRole("alert")).toContainText("too many nodes");
});

test("3D Studio rejects textures with excessive pixel dimensions", async ({ page }) => {
  await page.goto("/studio-3d");
  const pngHeader = Buffer.alloc(24);
  Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]).copy(pngHeader,0);
  pngHeader.writeUInt32BE(8192,16);
  pngHeader.writeUInt32BE(1,20);
  const document = {
    asset:{ version:"2.0" },
    images:[{ uri:`data:image/png;base64,${pngHeader.toString("base64")}` }]
  };
  await page.locator("#studio-model-file").setInputFiles({
    name:"oversized-texture.gltf", mimeType:"model/gltf+json", buffer:Buffer.from(JSON.stringify(document))
  });
  await expect(page.getByRole("alert")).toContainText("4,096 pixels per side");
});
