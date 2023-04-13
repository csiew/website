import config from "../config";

export default function queryHighlight(el: HTMLElement) {
  const top = (el.getBoundingClientRect().top ?? 0) - 96;
  el.style.padding = "0.25rem";
  el.style.background = "lightyellow";
  el.style.border = "2px solid var(--primary-color)";
  el.style.borderRadius = "var(--border-radius)";
  el.style.boxShadow = "var(--preset-shadow-component)";
  document.getElementById(config.rootElementId)?.scrollTo({ top });
}
