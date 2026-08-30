import { expect, test } from "@playwright/test";

test("renders the utility header horizontally above the main content", async ({ page }) => {
  await page.goto("/");

  const geometry = await page.evaluate(() => {
    const root = document.querySelector("#root");
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    if (!(root instanceof HTMLElement) || !(header instanceof HTMLElement) || !(main instanceof HTMLElement)) {
      return null;
    }

    const rootStyle = getComputedStyle(root);
    const headerRect = header.getBoundingClientRect();
    const mainRect = main.getBoundingClientRect();

    return {
      columns: rootStyle.gridTemplateColumns,
      headerBottom: headerRect.bottom,
      mainTop: mainRect.top,
      headerLeft: headerRect.left,
      mainLeft: mainRect.left,
      headerBorderBottom: getComputedStyle(header).borderBottomWidth
    };
  });

  expect(geometry).not.toBeNull();
  expect(geometry?.columns.split(" ")).toHaveLength(1);
  expect(geometry?.mainTop).toBeGreaterThanOrEqual(geometry?.headerBottom ?? 0);
  expect(geometry?.mainLeft).toBe(geometry?.headerLeft);
  expect(geometry?.headerBorderBottom).toBe("0px");
});

test("keeps the header usable on a narrow viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/projects");

  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await expect(page.getByRole("link", { name: "Back" })).toHaveCount(0);
  await expect(page.locator("[data-theme-cycle] [data-theme-label]")).toBeHidden();
});
