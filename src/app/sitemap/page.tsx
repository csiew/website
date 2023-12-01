"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { RssFeedEntry } from "../../utils/@types";
import fetchBlogPosts from "../../utils/fetch-blog-posts";
import fetchProjects from "../../utils/fetch-projects";
import Card from "../../components/ui/Card/Card";

export default function PostsPage() {
  const isMountedRef = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [posts, setPosts] = useState<RssFeedEntry[]>([]);
  const [projects, setProjects] = useState<RssFeedEntry[]>([]);

  async function getSitemap() {
    try {
      setIsLoading(true);
      setPosts(await fetchBlogPosts());
      setProjects(await fetchProjects());
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
      getSitemap();
    }
  }, []);

  return (
    <main className={styles.main}>
      <Card>
        <h2>Sitemap</h2>
        <div className={styles.content}>
          {isError && <p>Failed to fetch sitemap</p>}
          {isLoading && <p>Loading...</p>}
          {!isLoading && !isError && (
            <ul>
              <li>
                <Link href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/posts">
                  Posts
                </Link>
              </li>
              <ul>
                {posts.map((sm) => (
                  <li key={sm.url}>
                    <Link href={sm.url}>
                      {sm.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <li>
                <Link href="/projects">
                  Projects
                </Link>
              </li>
              <ul>
                {projects.map((sm) => (
                  <li key={sm.url}>
                    <Link href={sm.url}>
                      {sm.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </ul>
          )}
        </div>
      </Card>
    </main>
  );
}
