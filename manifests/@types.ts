export type Manifest = {
  slug?: string;
  title: string;
  subtitle: string;
  filePath: string;
  content?: string;
  tags?: string[];
}

export type Post = Manifest & {
  publishedAt: Date | number;
  layout: "blog" | "now";
  quotesAsNotes?: boolean;
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

export type Project = Manifest & {
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
}