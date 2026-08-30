import { expect, test } from "@playwright/test";

test("does not render a Back control on the homepage or other routes", async ({ page }) => {
  await page.goto("/projects");

  await expect(page.getByRole("link", { name: "Back" })).toHaveCount(0);
});

test("cycles theme preferences through the single theme button", async ({ page }) => {
  await page.goto("/");

  const button = page.getByRole("button", { name: /Theme: / });

  await expect(button).toHaveAttribute("aria-label", /Theme: Auto/);

  await button.click();
  await expect(button).toHaveAttribute("aria-label", /Theme: Light/);
  await expect(page.locator("html")).toHaveAttribute("data-theme-preference", "light");

  await button.click();
  await expect(button).toHaveAttribute("aria-label", /Theme: Dark/);
  await expect(page.locator("html")).toHaveAttribute("data-theme-preference", "dark");

  await button.click();
  await expect(button).toHaveAttribute("aria-label", /Theme: Auto/);
  await expect(page.locator("html")).toHaveAttribute("data-theme-preference", "auto");
});
