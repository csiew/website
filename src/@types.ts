export type BlogPost = {
  title: string;
  subtitle: string;
  urlSlug: string;
  tags: string[];
  body: string;
  publishedAt: Date;
  hiddenAt?: Date;
};

export type Project = {
  title: string;
  subtitle: string;
  urlSlug: string;
  status: "active" | "inactive" | "hiatus";
  tags: string[];
  stack: string[];
  body: string;
  duration: {
    start: string;
    end?: string;
  };
  links?: {
    website?: string;
    repository?: string;
  };
  assets?: {
    screenshots?: string[];
  };
};
