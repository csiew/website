import type { BlogPost } from "./journal.store";

export default (a: BlogPost, b: BlogPost): number => {
  const dateA = new Date(a.date).getTime();
  const dateB = new Date(b.date).getTime();
  return dateB > dateA ? 1 : dateA > dateB ? -1 : 0;
};
