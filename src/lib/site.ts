export const SITE = {
  name: "Clarence Siew",
  url: "https://www.clarencesiew.com",
  author: "Clarence Siew",
  description: "Software Engineer based in Melbourne",
  locale: "en_GB",
  language: "en"
};

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, SITE.url).toString();
}

export function absoluteAssetUrl(value?: string) {
  if (!value) return undefined;
  return new URL(value, SITE.url).toString();
}

export function formatDate(date: Date | string) {
  return new Date(date).toDateString();
}
