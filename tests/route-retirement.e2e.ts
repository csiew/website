import { expect, test } from "@playwright/test";

test("does not generate or link to the /feed page", async ({ page }) => {
  const response = await page.goto("/feed");

  expect(response?.status()).toBe(404);

  await page.goto("/");
  await expect(page.getByRole("link", { name: "Feed" })).toHaveCount(0);
});

test("does not leave an orphaned Feed import or stylesheet reference", async ({ page }) => {
  await page.goto("/");

  const html = await page.content();
  expect(html).not.toContain("feed-posts-list");
  expect(html).not.toContain("Feed.tsx");
});
