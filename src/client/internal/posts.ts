import { BlogPost } from "../../@types";
import { getCache, hasCacheExpired, removeCache, storeCache } from "../cache";

export async function getPosts() {
  try {
    const cachedPosts = getCache("posts");
    if (!cachedPosts || !Object.keys(cachedPosts).length || !Object.keys(cachedPosts).includes("body") || hasCacheExpired(cachedPosts.expiresAt, cachedPosts.readCount)) {
      removeCache("posts");
      throw new Error("Cache is invalid");
    }
    return cachedPosts.body;
  } catch (err) {
    console.error(err);
    const postsResult = await fetch("/api/posts");
    if (!postsResult.ok) {
      throw new Error(`Failed to fetch posts: ${postsResult.status} ${postsResult.statusText}`);
    }
    const postsData = await postsResult.json();
    postsData.forEach((p: BlogPost) => p.body = atob(p.body));
    storeCache("posts", postsData);
    return postsData;
  }
}
