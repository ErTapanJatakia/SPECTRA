import { expect, test } from "@playwright/test";

test("Learning Academy reloads and remains usable offline after its first online visit", async ({ page, context }) => {
  await page.goto("/academy");
  await expect(page.getByRole("heading", { name: "Learning Academy" })).toBeVisible();

  await page.evaluate(async () => {
    if (!("serviceWorker" in navigator)) throw new Error("Service workers are unavailable.");
    await navigator.serviceWorker.ready;
  });
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);

  // The first document load can finish before the newly registered worker controls
  // the page. Reload once while online so the worker can cache the app's JS and CSS.
  await page.reload();
  await expect(page.getByRole("heading", { name: "Learning Academy" })).toBeVisible();

  const cachedResources = await page.evaluate(async () => {
    const keys = await caches.keys();
    const shellKey = keys.find((key) => key.startsWith("spectra-shell-"));
    if (!shellKey) throw new Error("The SPECTRA application-shell cache was not created.");
    const cache = await caches.open(shellKey);
    return (await cache.keys()).map((request) => new URL(request.url).pathname);
  });
  expect(cachedResources).toContain("/index.html");
  expect(cachedResources.some((path) => /\\.js$/i.test(path))).toBe(true);
  expect(cachedResources.some((path) => /\\.css$/i.test(path))).toBe(true);

  await context.setOffline(true);
  await page.reload();

  await expect(page.getByRole("heading", { name: "Learning Academy" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Choose a pathway" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Test your understanding" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Submit answers/ })).toBeDisabled();
});
