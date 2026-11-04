import { expect, test } from "@playwright/test";

test("opens the SPECTRA foundation dashboard", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/SPECTRA/);
  await expect(page.getByRole("heading", { name: /GLOBAL DEFENCE SYSTEMS/i })).toBeVisible();
  await expect(page.getByText("Explore the divisions")).toBeVisible();
});

test("navigates to the 3D Studio foundation entry point", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /3D Studio/i }).first().click();
  await expect(page.getByRole("heading", { name: "3D Studio" })).toBeVisible();
  await expect(page.getByText("This module is not yet implemented")).toBeVisible();
});

test("search returns matching knowledge divisions", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("searchbox", { name: "Search SPECTRA divisions" }).fill("cyber defence");
  await page.getByRole("searchbox", { name: "Search SPECTRA divisions" }).press("Enter");
  await expect(page.getByRole("heading", { name: "Cyber & Digital Defence" })).toBeVisible();
});

test("theme preference can be changed", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Visual theme").selectOption("contrast");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "contrast");
});
