export type Post = {
  slug?: string;
  title: string;
  subtitle: string;
  publishedAt: Date | number;
  layout: "blog" | "now";
  filePath: string;
  quotesAsNotes?: boolean;
  content?: string;
  tags?: string[];
};

export enum TechStack {
  Shell = "Shell",
  Python = "Python",
  Java = "Java",
  Spring = "Spring",
  HTML = "HTML",
  Node = "Node",
  Express = "Express",
  JavaScript = "JavaScript",
  TypeScript = "TypeScript",
  React = "React",
  NextJS = "Next.js",
  VueJS = "Vue.js",
  Svelte = "Svelte",
  SvelteKit = "SvelteKit",
  MithrilJS = "Mithril.js",
  Swift = "Swift",
  UIKit = "UIKit",
  SwiftUI = "SwiftUI"
}

export type Project = {
  slug?: string;
  title: string;
  subtitle: string;
  status: "active" | "inactive" | "hiatus";
  duration?: {
    start?: string;
    end?: string;
  };
  assets?: {
    screenshots?: string[];
  };
  links?: {
    website?: string;
    repository?: string;
  };
  stack?: TechStack[];
  filePath: string;
  content?: string;
  tags?: string[];
}