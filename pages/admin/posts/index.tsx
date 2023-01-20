import React, { useContext, useEffect, useReducer, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import retitle from "../../../lib/retitle";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import NavigationView from "../../../components/ui/NavigationView";
import Paper from "../../../components/ui/Paper";
import Link from "next/link";
import { deletePost, savePost } from "../../../firebase/posts";
import config from "../../../config";
import Alert from "../../../components/ui/Alert";
import { BlogPost } from "../../../lib/blog";
import { serverTimestamp } from "@firebase/firestore/lite";
import ContentContext from "../../../stores/content";
import useContentStoreHook from "../../../stores/content/hook";
import { encodeContent } from "../../../lib/encoding";

type PostsPageState = {
  selectedPosts: Map<string, boolean>;
  hasSelectedPosts: boolean;
  inEditMode: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  hasAttemptedCommit: {
    delete: boolean;
    publish: boolean;
    unpublish: boolean;
  };
  isSuccessfulCommit: {
    delete: boolean;
    publish: boolean;
    unpublish: boolean;
  };
};

const Posts = ({ isLoggedIn }: any) => {
  const router = useRouter();
  const contentContext = useContext(ContentContext);
  const contentStoreHook = useContentStoreHook();
  const isMountedRef = useRef<any>(false);

  const [pageState, updatePageState] = useReducer(
    (prev: Partial<PostsPageState>, next: Partial<PostsPageState>) => {
      const newPageState = { ...prev, ...next };
      return newPageState;
    },
    {
      selectedPosts: new Map<string, boolean>(),
      hasSelectedPosts: false,
      inEditMode: false,
      isLoading: false,
      isSuccess: false,
      hasAttemptedCommit: {
        delete: false,
        publish: false,
        unpublish: false
      },
      isSuccessfulCommit: {
        delete: false,
        publish: false,
        unpublish: false
      }
    }
  );

  const handleGetPosts = async (force?: boolean) => {
    if (!!force || !contentContext.posts.length) {
      updatePageState({ isLoading: true });
      try {
        await contentStoreHook.getPosts(force);
        updatePageState({ isSuccess: true, isLoading: false });
      } catch (err) {
        if (config.debugMode) console.error(err);
        updatePageState({ isSuccess: false, isLoading: false });
      }
    }
    const selectionMap = new Map<string, boolean>();
    contentContext.posts.map((p) => selectionMap.set(p.id!, false));
    updatePageState({
      selectedPosts: selectionMap,
      isSuccess: true
    });
    console.debug("Done fetching");
  };

  const handleUpdateSelectedFlag = (selectionMap: Map<string, boolean>) => {
    const selectedKeys: string[] = [];
    selectionMap?.forEach((v, k) => {
      if (v === true) selectedKeys.push(k);
    });
    updatePageState({ hasSelectedPosts: selectedKeys.length > 0 });
  };

  const handleDeletePosts = async () => {
    const selectedKeys: string[] = [];
    pageState.selectedPosts?.forEach((v, k) => {
      if (v === true) selectedKeys.push(k);
    });
    updatePageState({
      isLoading: true,
      hasAttemptedCommit: {
        delete: true,
        publish: false,
        unpublish: false
      }
    });
    try {
      await Promise.all(selectedKeys.map((k) => deletePost(k)));
      updatePageState({
        isLoading: false,
        inEditMode: false,
        isSuccessfulCommit: {
          delete: true,
          publish: false,
          unpublish: false
        }
      });
    } catch (err) {
      if (config.debugMode) console.error(err);
      updatePageState({
        isLoading: false,
        isSuccessfulCommit: {
          delete: false,
          publish: false,
          unpublish: false
        }
      });
    }
    await handleGetPosts(true);
  };

  const handlePublishPosts = async () => {
    const selectedKeys: string[] = [];
    pageState.selectedPosts?.forEach((v, k) => {
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
    updatePageState({
      isLoading: true,
      hasAttemptedCommit: {
        delete: false,
        publish: true,
        unpublish: false
      }
    });
    try {
      await Promise.all(
        publishQueue.map((p) => {
          return savePost(p, p.id, { content: encodeContent(p.content ?? ""), isPublished: true, publishedOn: serverTimestamp() });
        })
      );
      updatePageState({
        isLoading: false,
        inEditMode: false,
        isSuccessfulCommit: {
          delete: false,
          publish: true,
          unpublish: false
        }
      });
    } catch (err) {
      if (config.debugMode) console.error(err);
      updatePageState({
        isLoading: false,
        isSuccessfulCommit: {
          delete: false,
          publish: false,
          unpublish: false
        }
      });
    }
    await handleGetPosts(true);
  };

  const handleUnpublishPosts = async () => {
    const selectedKeys: string[] = [];
    pageState.selectedPosts?.forEach((v, k) => {
      if (v === true) selectedKeys.push(k);
    });
    const publishQueue: BlogPost[] = selectedKeys
      .map((k) => {
        const post = contentContext.posts.find((p) => p.id === k && p.isPublished === true);
        if (post) {
          return post;
        }
      })
      .filter((p) => !!p) as BlogPost[];
    updatePageState({
      isLoading: true,
      hasAttemptedCommit: {
        delete: false,
        publish: false,
        unpublish: true
      }
    });
    try {
      await Promise.all(
        publishQueue.map((p) => {
          return savePost(p, p.id, { content: encodeContent(p.content ?? ""), isPublished: false, publishedOn: undefined });
        })
      );
      updatePageState({
        isLoading: false,
        inEditMode: false,
        isSuccessfulCommit: {
          delete: false,
          publish: false,
          unpublish: true
        }
      });
    } catch (err) {
      if (config.debugMode) console.error(err);
      updatePageState({
        isLoading: false,
        isSuccessfulCommit: {
          delete: false,
          publish: false,
          unpublish: false
        }
      });
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
          <article className="app-page">
            <h2>Posts</h2>
            {
              !pageState.isLoading && !pageState.isSuccess
                ? (
                  <Alert variant="error">
                    Failed to fetch posts. Try again.
                  </Alert>
                )
                : <></>
            }
            {
              !pageState.isLoading
                ? (
                  <>
                    {
                      pageState.hasAttemptedCommit?.delete
                        ? (
                          !pageState.isSuccessfulCommit?.delete
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
                      pageState.hasAttemptedCommit?.publish
                        ? (
                          !pageState.isSuccessfulCommit?.publish
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
                      pageState.hasAttemptedCommit?.unpublish
                        ? (
                          !pageState.isSuccessfulCommit?.unpublish
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
              <section className="admin-content-list-header">
                {
                  !pageState.inEditMode
                    ? <Link href="/admin/posts/edit/new" className={pageState.isLoading ? "disabled" : ""}>New Post</Link>
                    : (
                      <>
                        <Link href="#" onClick={handleDeletePosts} className={!!pageState.isLoading || !pageState.hasSelectedPosts ? "disabled" : ""}>Delete Selected</Link>
                        <Link href="#" onClick={handlePublishPosts} className={!!pageState.isLoading || !pageState.hasSelectedPosts ? "disabled" : ""}>Publish Selected</Link>
                        <Link href="#" onClick={handleUnpublishPosts} className={!!pageState.isLoading || !pageState.hasSelectedPosts ? "disabled" : ""}>Unpublish Selected</Link>
                      </>
                    )
                }
                <span style={{ width: "100%" }}></span>
                {
                  !pageState.inEditMode
                    ? (
                      <Link
                        href="#"
                        onClick={() => {
                          handleGetPosts(true);
                          updatePageState({ isSuccessfulCommit: { delete: false, publish: false, unpublish: false } });
                        }}
                        className={pageState.isLoading ? "disabled" : ""}>
                        Refresh
                      </Link>
                    )
                    : <></>
                }
                <Link href="#" onClick={() => updatePageState({ inEditMode: !pageState.inEditMode })} className={pageState.isLoading ? "disabled" : ""}>
                  {pageState.inEditMode ? "Done" : "Edit"}
                </Link>
              </section>
              {
                pageState.isLoading
                  ? (
                    <section style={{ padding: "1rem" }}>
                      <p>Loading...</p>
                    </section>
                  )
                  : (
                    <section className="admin-content-list">
                      <ul>
                        {
                          contentContext.posts.map((p: BlogPost, i: number) => (
                            <li key={p.slug ?? i}>
                              {
                                pageState.inEditMode
                                  ? (
                                    <span className="admin-content-list-checkbox">
                                      <input
                                        type="checkbox"
                                        defaultChecked={pageState.selectedPosts?.get(p.id!)}
                                        onClick={() => {
                                          const currentValue = pageState.selectedPosts?.get(p.id!) ?? false;
                                          const newSelectionMap = pageState.selectedPosts;
                                          newSelectionMap!.set(p.id!, !currentValue);
                                          updatePageState({ selectedPosts: newSelectionMap });
                                          handleUpdateSelectedFlag(newSelectionMap!);
                                        }} />
                                    </span>
                                  )
                                  : <></>
                              }
                              <Link href={`/admin/posts/edit/${p.slug}`} className={pageState.inEditMode ? "disabled" : ""} title={p.title}>
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
