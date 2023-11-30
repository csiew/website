import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "./Posts.module.css";
import Card from "../../components/ui/Card/Card";

export default function Posts() {
  const isMountedRef = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [posts, setPosts] = useState<any>([]);

  async function getPosts() {
    try {
      setIsLoading(true);
      const result = await axios.get("/api/posts");
      if (result.status !== 200) {
        throw new Error("Failed to fetch posts");
      }
      setPosts(result.data.posts);
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
      <h2>Posts</h2>
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
