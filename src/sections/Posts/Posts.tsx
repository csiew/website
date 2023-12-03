"use client";

import React, { useContext } from "react";
import Link from "next/link";
import styles from "./Posts.module.css";
import Card from "../../components/ui/Card/Card";
import CardHeader from "../../components/ui/Card/CardHeader";
import { DataContext } from "../../stores/data";
import { BlogPost } from "../../@types";

export default function Posts({ isListView }: { isListView?: boolean }) {
  const { posts, isLoading, isError } = useContext(DataContext);
  const filteredPosts = isListView ? posts : posts.slice(0, 3);

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
