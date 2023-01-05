import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import retitle from "../../../lib/retitle";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import NavigationView from "../../../components/ui/NavigationView";
import Paper from "../../../components/ui/Paper";
import Link from "next/link";
import { getRemotePosts, mapDocumentDataToPosts } from "../../../firebase/posts";
import { AdminSessionContext } from "..";
import config from "../../../config";
import Alert from "../../../components/ui/Alert";
import { BlogPost } from "../../../lib/blog";

const Posts = ({ isLoggedIn }: any) => {
  const router = useRouter();
  const adminSessionContext = useContext(AdminSessionContext);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  const handleGetPosts = async () => {
    console.debug("Fetching posts from Firestore...");
    setIsLoading(true);
    try {
      const queryResults = await getRemotePosts();
      const extractedPosts = mapDocumentDataToPosts(queryResults.docs.map((d) => d.data()));
      adminSessionContext.posts = extractedPosts;
      setPosts(extractedPosts);
      setIsSuccess(true);
    } catch (err) {
      if (config.debugMode) console.error(err);
      setIsSuccess(true);
    } finally {
      setIsLoading(false);
    }
    console.debug("Done fetching");
  };

  useEffect(() => {
    if (!adminSessionContext.posts.length) {
      handleGetPosts();
    } else {
      setPosts(adminSessionContext.posts);
      setIsSuccess(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/admin");
    }
  }, [isLoggedIn]);

  return (
    <>
      <Head>
        <title>{retitle("Posts")}</title>
        <meta property="og:title" content={retitle("Posts")} key="title" />
      </Head>
      <Breadcrumbs
        items={[
          {
            title: "Admin",
            href: "/admin"
          },
          {
            title: "Posts"
          }
        ]} />
      <NavigationView
        content={(
          <article className="topLevelPage">
            <h2>Posts</h2>
            {
              !isLoading && !isSuccess
                ? (
                  <Alert variant="error">
                    Failed to fetch posts. Try again.
                  </Alert>
                )
                : <></>
            }
            <Paper style={{ padding: 0 }}>
              <section className="admin-posts-list-header">
                <Link href="/admin/posts/compose" className={isLoading ? "disabled" : ""}>New Post</Link>
                <Link href="#" onClick={() => handleGetPosts()} className={isLoading ? "disabled" : ""}>Refresh</Link>
              </section>
              {
                isLoading
                  ? (
                    <section style={{ padding: "1rem" }}>
                      <p>Loading...</p>
                    </section>
                  )
                  : (
                    <section className="admin-posts-list">
                      <ul>
                        {
                          posts.map((p: BlogPost, i: number) => (
                            <li key={p.slug ?? i}>
                              <Link href={`/admin/posts/edit/${p.slug}`} title={p.title}>
                                <h3>{p.title}</h3>
                                <sub>{p.publishedOn.toLocaleString()}</sub>
                              </Link>
                            </li>
                          ))
                        }
                      </ul>
                    </section>
                  )
              }
            </Paper>
          </article>
        )} />
    </>
  );
};

export default Posts;
