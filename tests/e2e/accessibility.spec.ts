import { expect, test } from "@playwright/test";

test("global skip link is the first keyboard stop and becomes visible on focus", async ({ page }) => {
  await page.goto("/peacekeeping");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeInViewport();
  await expect(skipLink).toHaveAttribute("href", "#main-content");
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("mobile navigation supports Escape and restores focus to its trigger", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/peacekeeping");
  const menuButton = page.getByRole("button", { name: "Open navigation" });
  await menuButton.click();
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Overview" })).toBeFocused();
  await expect(page.getByRole("banner").getByRole("button", { name: "Close navigation" })).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Primary" })).not.toHaveClass(/sidebar-open/);
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused();
});

test("mobile navigation exposes landmarks and announces route changes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/peacekeeping");
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeAttached();
  await expect(page.locator('[aria-live="polite"]')).toContainText("UN Peacekeeping page loaded");
});

test("Peacekeeping resource links use HTTPS and official UN hostnames", async ({ page }) => {
  await page.goto("/peacekeeping");
  const resources = page.locator(".peacekeeping-resource-list > li");
  await expect(resources).toHaveCount(9);

  const destinations = await resources.locator("a:not(.peacekeeping-resource-open)").evaluateAll((links) =>
    links.map((link) => ({
      href: (link as HTMLAnchorElement).href,
      target: (link as HTMLAnchorElement).target,
      rel: (link as HTMLAnchorElement).rel,
    }))
  );

  expect(destinations).toHaveLength(9);
  for (const destination of destinations) {
    const url = new URL(destination.href);
    expect(url.protocol).toBe("https:");
    expect(url.hostname.endsWith(".un.org") || url.hostname.endsWith(".unmissions.org")).toBe(true);
    expect(destination.target).toBe("_blank");
    expect(destination.rel.split(/\s+/)).toContain("noreferrer");
  }
});

test("Peacekeeping hub avoids horizontal overflow across key responsive widths", async ({ page }) => {
  for (const width of [320, 390, 620, 760, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/peacekeeping");
    await expect(page.getByRole("heading", { name: "Peacekeeping Education" })).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content, `document width at viewport ${width}px`).toBeLessThanOrEqual(dimensions.viewport);
  }
});
