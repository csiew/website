export type Post = {
  slug?: string;
  title: string;
  subtitle: string;
  publishedAt: Date | number;
  layout: "blog" | "now";
  filePath: string;
  quotesAsNotes?: boolean;
  content?: string;
};
