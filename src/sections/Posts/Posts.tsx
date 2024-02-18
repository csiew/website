"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Posts.module.css";
import Card from "../../components/ui/Card/Card";
import CardHeader from "../../components/ui/Card/CardHeader";
import { BlogPost } from "../../@types";
import { getPosts } from "../../client/internal/posts";

export default function Posts({ isListView }: { isListView?: boolean }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [{ isLoading, isError, isHydrated }, setFetchState] = useState<{ isLoading: boolean; isError: boolean; isHydrated: boolean }>({ isLoading: false, isError: false, isHydrated: false });
  const filteredPosts = isListView ? posts : posts.slice(0, 3);

  async function getData() {
    if (!isHydrated) {
      setFetchState({ isLoading: true, isError: false, isHydrated: false });
      try {
        setPosts(await getPosts());
        setFetchState({ isLoading: false, isError: false, isHydrated: true });
      } catch (err) {
        console.error(err);
        setFetchState({ isLoading: false, isError: true, isHydrated: false });
      }
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Card>
      {isError && <p>Failed to fetch posts</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !isError && (
        <>
          <CardHeader>
            <h2>
              {isListView ? "Posts" : <Link href="/posts">Posts</Link>}
            </h2>
            {!isListView && (
              <Link href="/posts" className="seeAllBtn">
                See all posts
              </Link>
            )}
          </CardHeader>
          <div className={styles.postsList}>
            <ul>
              {filteredPosts.map((p: BlogPost) => (
                <li key={p.urlSlug}>
                  <div className={styles.postsListEntryHeader}>
                    <Link href={`/posts/${p.urlSlug}`}>
                      <h3>{p.title}</h3>
                    </Link>
                    <sub>
                      {new Date(p.publishedAt).toLocaleDateString()}
                    </sub>
                  </div>
                  <p>{p.subtitle}</p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </Card>
  );
}
