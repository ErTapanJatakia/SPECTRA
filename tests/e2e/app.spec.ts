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


test("3D Studio blocks remote buffer resources", async ({ page }) => {
  await page.goto("/studio-3d");
  const document = { asset:{ version:"2.0" }, buffers:[{ byteLength:16, uri:"https://example.invalid/model.bin" }] };
  await page.locator("#studio-model-file").setInputFiles({
    name:"remote-buffer.gltf", mimeType:"model/gltf+json", buffer:Buffer.from(JSON.stringify(document))
  });
  await expect(page.getByRole("alert")).toContainText("External model resources are blocked");
});

test("3D Studio rejects malformed embedded buffer encodings", async ({ page }) => {
  await page.goto("/studio-3d");
  const document = { asset:{ version:"2.0" }, buffers:[{ byteLength:4, uri:"data:application/octet-stream,AAAA" }] };
  await page.locator("#studio-model-file").setInputFiles({
    name:"malformed-buffer.gltf", mimeType:"model/gltf+json", buffer:Buffer.from(JSON.stringify(document))
  });
  await expect(page.getByRole("alert")).toContainText("Buffers must use embedded base64");
});

test("3D Studio rejects invalid bufferView references and ranges", async ({ page }) => {
  await page.goto("/studio-3d");
  const document = {
    asset:{ version:"2.0" },
    buffers:[{ byteLength:8, uri:"data:application/octet-stream;base64,AAAAAAAAAAA=" }],
    bufferViews:[{ buffer:1, byteLength:4 }]
  };
  await page.locator("#studio-model-file").setInputFiles({
    name:"invalid-buffer-view.gltf", mimeType:"model/gltf+json", buffer:Buffer.from(JSON.stringify(document))
  });
  await expect(page.getByRole("alert")).toContainText("invalid bufferView range");
});

test("3D Studio rejects malformed accessor definitions", async ({ page }) => {
  await page.goto("/studio-3d");
  const document = {
    asset:{ version:"2.0" },
    accessors:[{ count:1, type:"VEC3", componentType:9999 }]
  };
  await page.locator("#studio-model-file").setInputFiles({
    name:"invalid-accessor.gltf", mimeType:"model/gltf+json", buffer:Buffer.from(JSON.stringify(document))
  });
  await expect(page.getByRole("alert")).toContainText("invalid or unsupported accessor");
});

test("3D Studio rejects excessive mesh primitive counts", async ({ page }) => {
  await page.goto("/studio-3d");
  const document = {
    asset:{ version:"2.0" },
    meshes:[{ primitives:Array.from({ length:1001 }, () => ({})) }]
  };
  await page.locator("#studio-model-file").setInputFiles({
    name:"too-many-primitives.gltf", mimeType:"model/gltf+json", buffer:Buffer.from(JSON.stringify(document))
  });
  await expect(page.getByRole("alert")).toContainText("1,000 primitive limit");
});

test("3D Studio rejects excessive embedded image counts", async ({ page }) => {
  await page.goto("/studio-3d");
  const document = {
    asset:{ version:"2.0" },
    images:Array.from({ length:13 }, () => ({ uri:"data:image/png;base64," }))
  };
  await page.locator("#studio-model-file").setInputFiles({
    name:"too-many-images.gltf", mimeType:"model/gltf+json", buffer:Buffer.from(JSON.stringify(document))
  });
  await expect(page.getByRole("alert")).toContainText("too many images");
});

test("3D Studio rejects malformed GLB chunk boundaries", async ({ page }) => {
  await page.goto("/studio-3d");
  const malformed = Buffer.alloc(20);
  malformed.writeUInt32LE(0x46546c67,0);
  malformed.writeUInt32LE(2,4);
  malformed.writeUInt32LE(20,8);
  malformed.writeUInt32LE(8,12);
  malformed.writeUInt32LE(0x4e4f534a,16);
  await page.locator("#studio-model-file").setInputFiles({
    name:"truncated-chunk.glb", mimeType:"model/gltf-binary", buffer:malformed
  });
  await expect(page.getByRole("alert")).toContainText("invalid or truncated chunk");
});

test("3D Studio rejects zero-byte files and unsupported extensions", async ({ page }) => {
  await page.goto("/studio-3d");
  await page.locator("#studio-model-file").setInputFiles({
    name:"empty.gltf", mimeType:"model/gltf+json", buffer:Buffer.alloc(0)
  });
  await expect(page.getByRole("alert")).toContainText("empty");
  await page.locator("#studio-model-file").setInputFiles({
    name:"model.obj", mimeType:"text/plain", buffer:Buffer.from("v 0 0 0")
  });
  await expect(page.getByRole("alert")).toContainText("Unsupported file");
});

test("3D Studio keeps the demonstration scene available after a rejected import", async ({ page }) => {
  await page.goto("/studio-3d");
  await page.locator("#studio-model-file").setInputFiles({
    name:"invalid.gltf", mimeType:"model/gltf+json", buffer:Buffer.from("{not-json")
  });
  await expect(page.getByRole("alert")).toContainText("invalid JSON");
  await expect(page.getByText("DEMONSTRATION SCENE")).toBeVisible();
  await expect(page.getByRole("heading", { name:"Explore features" })).toBeVisible();
});

test("3D Studio annotation and viewport controls remain keyboard-operable", async ({ page }) => {
  await page.goto("/studio-3d");
  const firstAnnotation = page.getByRole("button", { name:"01 Primary structure" });
  await expect(firstAnnotation).toBeVisible();
  await firstAnnotation.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText("A visual reference point for understanding the model's overall form.")).toBeVisible();
  await page.getByRole("button", { name:/Hide labels/ }).click();
  await expect(page.getByRole("button", { name:"Show annotation: Primary structure" })).toHaveCount(0);
  await page.getByRole("button", { name:/Show labels/ }).click();
  await expect(page.getByRole("button", { name:"Show annotation: Primary structure" })).toBeVisible();
});


test("3D Studio releases browser object URLs when a local model is unloaded", async ({ page }) => {
  await page.addInitScript(() => {
    const created: string[] = [];
    const revoked: string[] = [];
    const create = URL.createObjectURL.bind(URL);
    const revoke = URL.revokeObjectURL.bind(URL);
    URL.createObjectURL = (object: Blob) => {
      const url = create(object);
      created.push(url);
      return url;
    };
    URL.revokeObjectURL = (url: string) => {
      revoked.push(url);
      revoke(url);
    };
    Object.defineProperty(window, "__spectraObjectUrls", { value: { created, revoked } });
  });
  await page.goto("/studio-3d");
  const model = {
    asset: { version: "2.0" },
    scene: 0,
    scenes: [{ nodes: [] }]
  };
  await page.locator("#studio-model-file").setInputFiles({
    name: "minimal-local-model.gltf",
    mimeType: "model/gltf+json",
    buffer: Buffer.from(JSON.stringify(model))
  });
  await expect(page.getByText("LOCAL MODEL")).toBeVisible();
  await page.getByRole("button", { name: "Unload local model" }).click();
  await expect(page.getByText("DEMONSTRATION SCENE")).toBeVisible();
  await expect.poll(async () => page.evaluate(() => {
    const tracker = (window as Window & { __spectraObjectUrls: { created: string[]; revoked: string[] } }).__spectraObjectUrls;
    return tracker.revoked.length === 1 && tracker.revoked[0] === tracker.created[0];
  })).toBe(true);
});

test("3D Studio ignores stale validation results after a newer model is selected", async ({ page }) => {
  await page.addInitScript(() => {
    const originalText = Blob.prototype.text;
    let delayFirstRead = true;
    Blob.prototype.text = function () {
      const result = originalText.call(this);
      if (!delayFirstRead) return result;
      delayFirstRead = false;
      return new Promise<string>((resolve, reject) => {
        setTimeout(() => { void result.then(resolve, reject); }, 200);
      });
    };
  });
  await page.goto("/studio-3d");
  await page.locator("#studio-model-file").setInputFiles({
    name: "stale-invalid.gltf",
    mimeType: "model/gltf+json",
    buffer: Buffer.from("{invalid")
  });
  const model = {
    asset: { version: "2.0" },
    scene: 0,
    scenes: [{ nodes: [] }]
  };
  await page.locator("#studio-model-file").setInputFiles({
    name: "current-model.gltf",
    mimeType: "model/gltf+json",
    buffer: Buffer.from(JSON.stringify(model))
  });
  await expect(page.getByText("LOCAL MODEL")).toBeVisible();
  await expect(page.getByRole("alert")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Unload local model" })).toBeVisible();
});

test("3D Studio reports WebGL context loss and recovery", async ({ page }) => {
  await page.goto("/studio-3d");
  await page.locator("canvas").first().evaluate((canvas) => {
    canvas.dispatchEvent(new Event("webglcontextlost", { cancelable: true }));
  });
  await expect(page.getByRole("alert")).toContainText("The WebGL context was lost");
  await page.locator("canvas").first().evaluate((canvas) => {
    canvas.dispatchEvent(new Event("webglcontextrestored"));
  });
  await expect(page.getByRole("alert")).toHaveCount(0);
});
