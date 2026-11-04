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
  await expect(page.getByRole("heading", { name:"LCA Tejas" })).toBeVisible();
  await expect(page.getByRole("heading", { name:"M1 Abrams Main Battle Tank" })).toHaveCount(0);
});

test("equipment profile presents provenance and source links", async ({ page }) => {
  await page.goto("/equipment/lca-tejas");
  await expect(page.getByRole("heading", { name:"Light Combat Aircraft (LCA) Tejas" })).toBeVisible();
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
