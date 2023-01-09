import React, { useContext, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import retitle from "../../../lib/retitle";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import NavigationView from "../../../components/ui/NavigationView";
import Paper from "../../../components/ui/Paper";
import Link from "next/link";
import { deletePost, encodeContent, savePost } from "../../../firebase/posts";
import config from "../../../config";
import Alert from "../../../components/ui/Alert";
import { BlogPost } from "../../../lib/blog";
import { serverTimestamp } from "@firebase/firestore/lite";
import ContentContext from "../../../stores/posts";
import usePostStoreHook from "../../../stores/posts/hook";

type CommitAttemptFlags = {
  delete: boolean;
  publish: boolean;
  unpublish: boolean;
};

const Posts = ({ isLoggedIn }: any) => {
  const router = useRouter();
  const contentContext = useContext(ContentContext);
  const postStoreHook = usePostStoreHook();
  const isMountedRef = useRef<any>(false);

  const [selectedPosts, setSelectedPosts] = useState<Map<string, boolean>>();
  const [hasSelectedPosts, setHasSelectedPosts] = useState<boolean>(false);
  const [inEditMode, setInEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  const [hasAttemptedCommit, setHasAttemptedCommit] = useState<CommitAttemptFlags>(
    { delete: false, publish: false, unpublish: false }
  );
  const [isPublishSuccess, setIsPublishSuccess] = useState<boolean>(false);
  const [isUnpublishSuccess, setIsUnpublishSuccess] = useState<boolean>(false);
  const [isDeletionSuccess, setIsDeletionSuccess] = useState<boolean>(false);

  const handleGetPosts = async (force?: boolean) => {
    if (!!force || !contentContext.posts.length) {
      setIsLoading(true);
      try {
        await postStoreHook.getPosts(force);
        setIsSuccess(true);
      } catch (err) {
        if (config.debugMode) console.error(err);
        setIsSuccess(true);
      } finally {
        setIsLoading(false);
      }
    }
    const selectionMap = new Map<string, boolean>();
    contentContext.posts.map((p) => selectionMap.set(p.id!, false));
    setSelectedPosts(selectionMap);
    setIsSuccess(true);
    console.debug("Done fetching");
  };

  const handleUpdateSelectedFlag = (selectionMap: Map<string, boolean>) => {
    const selectedKeys: string[] = [];
    selectionMap?.forEach((v, k) => {
      if (v === true) selectedKeys.push(k);
    });
    setHasSelectedPosts(selectedKeys.length > 0);
  };

  const handleDeletePosts = async () => {
    const selectedKeys: string[] = [];
    selectedPosts?.forEach((v, k) => {
      if (v === true) selectedKeys.push(k);
    });
    setIsLoading(true);
    setHasAttemptedCommit({ delete: true, publish: false, unpublish: false });
    try {
      await Promise.all(selectedKeys.map((k) => deletePost(k)));
      setIsDeletionSuccess(true);
      setInEditMode(false);
    } catch (err) {
      if (config.debugMode) console.error(err);
      setIsDeletionSuccess(false);
    } finally {
      setIsLoading(false);
    }
    await handleGetPosts(true);
  };

  const handlePublishPosts = async () => {
    const selectedKeys: string[] = [];
    selectedPosts?.forEach((v, k) => {
      if (v === true) selectedKeys.push(k);
    });
    const publishQueue: BlogPost[] = selectedKeys
      .map((k) => {
        const post = contentContext.posts.find((p) => p.id === k && p.isPublished === false);
        if (post) {
          return post;
        }
      })
      .filter((p) => !!p) as BlogPost[];
    setIsLoading(true);
    setHasAttemptedCommit({ delete: false, publish: true, unpublish: false });
    try {
      await Promise.all(
        publishQueue.map((p) => {
          return savePost(p, p.id, { content: encodeContent(p.content ?? ""), isPublished: true, publishedOn: serverTimestamp() });
        })
      );
      setIsPublishSuccess(true);
      setInEditMode(false);
    } catch (err) {
      if (config.debugMode) console.error(err);
      setIsPublishSuccess(false);
    } finally {
      setIsLoading(false);
    }
    await handleGetPosts(true);
  };

  const handleUnpublishPosts = async () => {
    const selectedKeys: string[] = [];
    selectedPosts?.forEach((v, k) => {
      if (v === true) selectedKeys.push(k);
    });
    const publishQueue: BlogPost[] = selectedKeys
      .map((k) => {
        const post = contentContext.posts.find((p: BlogPost) => p.id === k && p.isPublished === true);
        if (post) {
          return post;
        }
      })
      .filter((p) => !!p) as BlogPost[];
    setIsLoading(true);
    setHasAttemptedCommit({ delete: false, publish: false, unpublish: true });
    try {
      await Promise.all(
        publishQueue.map((p) => {
          return savePost(p, p.id, { content: encodeContent(p.content ?? ""), isPublished: false, publishedOn: undefined });
        })
      );
      setIsUnpublishSuccess(true);
      setInEditMode(false);
    } catch (err) {
      if (config.debugMode) console.error(err);
      setIsUnpublishSuccess(false);
    } finally {
      setIsLoading(false);
    }
    await handleGetPosts(true);
  };

  useEffect(() => {
    if (!isMountedRef.current) handleGetPosts();
    isMountedRef.current = true;
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
            {
              !isLoading
                ? (
                  <>
                    {
                      hasAttemptedCommit.delete
                        ? (
                          !isDeletionSuccess
                            ? (
                              <Alert variant="error">
                                Failed to delete selected posts.
                              </Alert>
                            )
                            : (
                              <Alert variant="success">
                                Successfully deleted selected posts.
                              </Alert>
                            )
                        )
                        : <></>
                    }
                    {
                      hasAttemptedCommit.publish
                        ? (
                          !isPublishSuccess
                            ? (
                              <Alert variant="error">
                                Failed to publish selected posts.
                              </Alert>
                            )
                            : (
                              <Alert variant="success">
                                Successfully publish selected posts.
                              </Alert>
                            )
                        )
                        : <></>
                    }
                    {
                      hasAttemptedCommit.unpublish
                        ? (
                          !isUnpublishSuccess
                            ? (
                              <Alert variant="error">
                                Failed to unpublish selected posts.
                              </Alert>
                            )
                            : (
                              <Alert variant="success">
                                Successfully unpublish selected posts.
                              </Alert>
                            )
                        )
                        : <></>
                    }
                  </>
                )
                : <></>
            }
            <Paper style={{ padding: 0 }}>
              <section className="admin-posts-list-header">
                {
                  !inEditMode
                    ? <Link href="/admin/posts/edit/new" className={isLoading ? "disabled" : ""}>New Post</Link>
                    : (
                      <>
                        <Link href="#" onClick={handleDeletePosts} className={!!isLoading || !hasSelectedPosts ? "disabled" : ""}>Delete Selected</Link>
                        <Link href="#" onClick={handlePublishPosts} className={!!isLoading || !hasSelectedPosts ? "disabled" : ""}>Publish Selected</Link>
                        <Link href="#" onClick={handleUnpublishPosts} className={!!isLoading || !hasSelectedPosts ? "disabled" : ""}>Unpublish Selected</Link>
                      </>
                    )
                }
                <span style={{ width: "100%" }}></span>
                {
                  !inEditMode
                    ? (
                      <Link
                        href="#"
                        onClick={() => {
                          handleGetPosts(true);
                          setHasAttemptedCommit({ delete: false, publish: false, unpublish: false });
                        }}
                        className={isLoading ? "disabled" : ""}>
                        Refresh
                      </Link>
                    )
                    : <></>
                }
                <Link href="#" onClick={() => setInEditMode(!inEditMode)} className={isLoading ? "disabled" : ""}>
                  {inEditMode ? "Done" : "Edit"}
                </Link>
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
                          contentContext.posts.map((p: BlogPost, i: number) => (
                            <li key={p.slug ?? i}>
                              {
                                inEditMode
                                  ? (
                                    <span className="admin-post-checkbox">
                                      <input
                                        type="checkbox"
                                        defaultChecked={selectedPosts?.get(p.id!)}
                                        onClick={() => {
                                          const currentValue = selectedPosts?.get(p.id!) ?? false;
                                          const newSelectionMap = selectedPosts;
                                          newSelectionMap!.set(p.id!, !currentValue);
                                          setSelectedPosts(newSelectionMap);
                                          handleUpdateSelectedFlag(newSelectionMap!);
                                        }} />
                                    </span>
                                  )
                                  : <></>
                              }
                              <Link href={`/admin/posts/edit/${p.slug}`} className={inEditMode ? "disabled" : ""} title={p.title}>
                                <h3>{p.title}</h3>
                                <sub>
                                  <b>Created at:</b> <span>{p.createdAt.toLocaleString()}</span>
                                </sub>
                                <sub>
                                  <b>Last modified at:</b> <span>{p.lastModified?.toLocaleString()}</span>
                                </sub>
                                <sub>
                                  <b>Published on:</b> <span>{p.isPublished ? p.publishedOn!.toLocaleString() : "Not published"}</span>
                                </sub>
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
