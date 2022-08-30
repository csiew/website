export type BlogPostPath = {
  year: string | number;
  month: string | number;
  shortTitle: string;
};

export type BlogPost = {
  id: string;
  path?: BlogPostPath;
  title: string;
  subtitle?: string;
  author: string;
  publishedOn: string;      // parse as date
  lastModified?: string;    // parse as date
  content?: string;
};

export type BlogPostFilter = {
  year: string | number;
  month?: string | number;
  shortTitle?: string;
};
