"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Posts.module.css";
import Card from "../../components/ui/Card/Card";
import CardHeader from "../../components/ui/Card/CardHeader";

export default function Posts({ isListView }: { isListView?: boolean }) {
  const isMountedRef = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [posts, setPosts] = useState<any>([]);

  async function getPosts() {
    try {
      setIsLoading(true);
      let queryUrl = "/api/posts";
      if (!isListView) {
        queryUrl += "?limit=3";
      }
      const result = await fetch(queryUrl);
      if (!result.ok) {
        throw new Error(`Failed to fetch posts: ${result.status} ${result.statusText}`);
      }
      const data = await result.json();
      setPosts(data.posts);
      setIsError(false);
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      getPosts();
    }
  }, []);

  return (
    <Card>
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
      {isError && <p>Failed to fetch posts</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !isError && (
        <div className={styles.postsList}>
          <ul>
            {posts.map((p: any) => (
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
      )}
    </Card>
  );
}
