"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import _ from "lodash";
import styles from "./page.module.css";
import Card from "../../../components/ui/Card/Card";
import Markdown from "../../../components/ui/Markdown/Markdown";

export default function PostPage({ params }: { params: { id: string } }) {
  const isMountedRef = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [post, setPost] = useState<any>();

  async function getProject() {
    try {
      setIsLoading(true);
      const result = await axios.get(`/api/posts/${params.id}`);
      if (result.status !== 200) {
        throw new Error(`Failed to fetch post: ${result.status} ${result.statusText}`);
      }
      let { data } = result;
      data.body = atob(result.data.body);
      console.log(data);
      setPost(result.data);
      setIsError(!result.data);
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
      getProject();
    }
  }, []);

  return (
    <main className={styles.main}>
      {isError && <p>Failed to fetch project</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !isError && (
        <Card>
          <div className={styles.header}>
            <h2>{post?.title}</h2>
            {post?.subtitle && (
              <span className={styles.subtitle}>
                {post?.subtitle}
              </span>
            )}
            <sub>{new Date(post?.publishedAt).toLocaleDateString()}</sub>
          </div>
          <div className={styles.content}>
            <Markdown>{post?.body}</Markdown>
          </div>
        </Card>
      )}
    </main>
  );
}
