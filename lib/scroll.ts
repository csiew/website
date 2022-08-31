import config from "../config";

export const scrollCardToTop = (id: string) => {
  console.log("[scrollCardToTop] called");
  const header = document.getElementsByTagName("header")[0];
  const el = document.getElementById(id);
  if (!el) {
    console.error(`[scrollCardToTop] could not find element by id: ${id}`);
    return;
  }
  console.log({
    elTop: el?.offsetTop,
    headerHeight: header.clientHeight
  });
  const top = el?.offsetTop - header.clientHeight - 16;
  document.getElementById(config.rootElementId)?.scrollTo({ top });
};
