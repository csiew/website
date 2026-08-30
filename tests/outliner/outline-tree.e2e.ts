import { expect, test } from "@playwright/test";

test("keeps every branch open without disclosure controls", async ({ page }) => {
  await page.goto("/");

  const outline = page.getByRole("navigation", { name: "Site outline" });
  await expect(outline.getByRole("link", { name: "Posts", exact: true })).toBeVisible();
  await expect(outline.getByRole("link", { name: "Tab Shelf", exact: true }).first()).toBeVisible();
  await expect(outline.getByRole("link", { name: "BiscuitWM", exact: true })).toBeVisible();
  await expect(outline.getByRole("button")).toHaveCount(0);
});

test("navigates when a section title link is clicked", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Site outline" }).getByRole("link", { name: "Projects", exact: true }).click();

  await expect(page).toHaveURL(/\/projects\/?$/);
});

test("keeps the complete link tree available without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");

  const outline = page.getByRole("navigation", { name: "Site outline" });
  await expect(outline.getByRole("link", { name: "Posts", exact: true })).toBeVisible();
  await expect(outline.getByRole("link", { name: "Tab Shelf", exact: true }).first()).toBeVisible();
  await context.close();
});
