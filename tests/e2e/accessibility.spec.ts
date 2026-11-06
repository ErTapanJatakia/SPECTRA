import { expect, test } from "@playwright/test";

test("global skip link is the first keyboard stop and becomes visible on focus", async ({ page }) => {
  await page.goto("/peacekeeping");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeInViewport();
  await expect(skipLink).toHaveAttribute("href", "#main-content");
  await expect(page.locator("#main-content")).toBeVisible();
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
