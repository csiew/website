import { expect, test } from "@playwright/test";

test("builds and serves all retained canonical routes and auxiliary endpoints", async ({ request }) => {
  for (const path of [
    "/",
    "/posts",
    "/projects",
    "/rss.xml",
    "/projects.xml",
    "/robots.txt"
  ]) {
    expect((await request.get(path)).ok(), path).toBeTruthy();
  }
});

test("does not emit the retired feed route or disclosure query/hash variants", async ({ request }) => {
  expect((await request.get("/feed")).status()).toBe(404);
  const body = await (await request.get("/")).text();
  expect(body).not.toContain("?outline=");
  expect(body).not.toContain("#outline");
});
