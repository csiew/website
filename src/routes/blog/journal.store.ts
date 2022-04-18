import { writable, type Writable } from "svelte/store";
import rawPosts from "./posts";

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  content: string;
};

export const store: Writable<BlogPost[]> = writable([]);

export function getPost(id: string): BlogPost | null {
  let result: BlogPost;
  store.update((posts: BlogPost[]) => {
    if (posts.length === 0) {
      posts = initialiseStore();
    }
    result = posts.find((post) => post.id === id);
    return posts;
  });
  return result;
}

export function initialiseStore(): BlogPost[] {
  let result: BlogPost[];
  store.update((posts) => {
    if (posts.length === 0) {
      result = rawPosts.map((post) => {
        return {
          ...post,
          content: decodeURI(post.content)
        } as BlogPost;
      });
      return result;
    } else {
      return posts;
    }
  });
  return result;
}
