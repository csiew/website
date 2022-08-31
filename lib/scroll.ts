import config from "../config";

export const scrollCardToTop = (id: string) => {
  const header = document.getElementsByTagName("header")[0];
  const el = document.getElementById(id);
  if (!el) {
    console.error(`[scrollCardToTop] could not find element by id: ${id}`);
    return;
  }
  const top = el?.offsetTop - header.clientHeight - 16;
  document.getElementById(config.rootElementId)?.scrollTo({ top });
};

export const scrollPageToTop = () => {
  document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
};
