export function normaliseTag(tag: string) {
  return tag.trim().toLowerCase().replace(/\s+/g, "-");
}

export function tagPath(tag: string) {
  return `/tags/${normaliseTag(tag)}`;
}

export function tagLabel(tag: string) {
  return normaliseTag(tag).replace(/-/g, " ");
}

export function uniqueTags(tags: string[]) {
  return Array.from(new Set(tags.map(normaliseTag))).sort((a, b) => a.localeCompare(b));
}

