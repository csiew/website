import { expect, test } from "@playwright/test";

test("shows visible external-link indicators with accessible labels on every external leaf", async ({ page }) => {
  await page.goto("/");

  const externalLinks = page.locator("[data-outline-link][target='_blank']");
  const count = await externalLinks.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i += 1) {
    const link = externalLinks.nth(i);

    await expect(link).toHaveAttribute("rel", /noreferrer/);
    await expect(link).toHaveAttribute("aria-label", /\(external link\)/);
    await expect(link.locator("[data-external-link-indicator]")).toBeVisible();
  }

  const localLinks = page.locator("[data-outline-link]:not([target])");
  expect(await localLinks.count()).toBeGreaterThan(0);
});
