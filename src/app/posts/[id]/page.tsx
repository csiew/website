"use client";

import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import styles from "./page.module.css";
import Card from "../../../components/ui/Card/Card";
import Markdown from "../../../components/ui/Markdown/Markdown";
import Breadcrumbs from "../../../components/ui/Breadcrumbs/Breadcrumbs";
import { BlogPost } from "../../../@types";
import { DataContext } from "../../../stores/data";

export default function PostPage({ params }: { params: { id: string } }) {
  const dataContext = useContext(DataContext);
  const [{ isLoading, isError }, setFetchState] = useState<{ isLoading: boolean, isError: boolean }>({ isLoading: false, isError: false });
  const [post, setPost] = useState<BlogPost>();

  async function getProject() {
    let data: BlogPost | undefined;
    try {
      setFetchState({ isLoading: true, isError: false });
      if (dataContext.posts.length) {
        data = dataContext.posts.find((post: BlogPost) => post.urlSlug === params.id);
      }
      if (!data) {
        const rehydratedResult = await fetch(`/api/posts/${params.id}`);
        if (!rehydratedResult.ok)
          throw new Error(`Failed to fetch post: ${rehydratedResult.status} ${rehydratedResult.statusText}`);
        data = await rehydratedResult.json();
        if (data) data.body = atob(data.body);
      }
      setPost(data);
      setFetchState({ isLoading: false, isError: false });
    } catch (err) {
      console.error(err);
      setFetchState({ isLoading: false, isError: true });
    }
  }

  useEffect(() => {
    getProject();
  }, []);

  return (
    <>
      <Breadcrumbs
        items={[
          {
            title: "Posts",
            href: "/posts"
          },
          {
            title: post?.title ?? "Post"
          }
        ]}
      />
      <main className={styles.main}>
        <Card>
          {isError && <p>Failed to fetch post</p>}
          {isLoading && <p>Loading...</p>}
          {!isLoading && !isError && (
            <>
              <div className={styles.header}>
                <h2>{post?.title}</h2>
                {post?.subtitle && (
                  <span className={styles.subtitle}>
                    {post?.subtitle}
                  </span>
                )}
                <sub>{new Date(post?.publishedAt ?? Date.now()).toLocaleDateString()}</sub>
              </div>
              <div className={styles.content}>
                <Markdown>{post?.body}</Markdown>
              </div>
            </>
          )}
        </Card>
      </main>
    </>
  );
}
