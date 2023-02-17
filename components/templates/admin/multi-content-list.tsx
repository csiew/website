import React, { useContext, useEffect, useReducer, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { serverTimestamp } from "@firebase/firestore";
import retitle from "../../../lib/retitle";
import Breadcrumbs from "../../ui/Breadcrumbs";
import NavigationView from "../../ui/NavigationView";
import Alert from "../../ui/Alert";
import Paper from "../../ui/Paper";
import ContentContext, { getContextStore } from "../../../stores/content";
import useContentStoreHook from "../../../stores/content/hook";
import config from "../../../config";
import { encodeContent } from "../../../lib/encoding";
import { PublishableItem } from "../../../lib/@types";

type MultiContentListProps = {
  isLoggedIn: boolean;
  terminology: {
    pageTitle: string;
    itemPlural: string;
    itemSingular: string;
    urlSlug: string;
  };
  firebaseCallbacks: {
    save: (
      item: { [k: string]: any },
      id?: string,
      overrideProps?: { [k: string]: any }
    ) => Promise<void>;
    delete: (id: string) => Promise<void>;
  };
  contextRefs: {
    storePropName: string;
  };
};

type MultiContentListPageState = {
  selectedItems: Map<string, boolean>;
  hasSelectedItems: boolean;
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

const MultiContentList = ({ isLoggedIn, terminology, firebaseCallbacks, contextRefs }: MultiContentListProps) => {
  const router = useRouter();
  const contentContext = useContext(ContentContext);
  const contentStoreHook = useContentStoreHook();
  const isMountedRef = useRef<any>(false);
  
  const [pageState, updatePageState] = useReducer(
    (prev: Partial<MultiContentListPageState>, next: Partial<MultiContentListPageState>) => {
      const newPageState = { ...prev, ...next };
      return newPageState;
    },
    {
      selectedItems: new Map<string, boolean>(),
      hasSelectedItems: false,
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

  const getStore = () => {
    return getContextStore(contentContext, contextRefs.storePropName);
  };

  const handleGetItems = async (force?: boolean) => {
    if (!!force || !getStore().length) {
      updatePageState({ isLoading: true });
      try {
        await contentStoreHook.get(terminology.urlSlug, force);
        updatePageState({ isSuccess: true, isLoading: false });
      } catch (err) {
        if (config.debugMode) console.error(err);
        updatePageState({ isSuccess: false, isLoading: false });
      }
    }
    const selectionMap = new Map<string, boolean>();
    getStore().map((p) => selectionMap.set(p.id!, false));
    updatePageState({
      selectedItems: selectionMap,
      isSuccess: true
    });
    console.debug("Done fetching");
  };

  const handleUpdateSelectedFlag = (selectionMap: Map<string, boolean>) => {
    const selectedKeys: string[] = [];
    selectionMap?.forEach((v, k) => {
      if (v === true) selectedKeys.push(k);
    });
    updatePageState({ hasSelectedItems: selectedKeys.length > 0 });
  };

  const handleDeleteItems = async () => {
    const selectedKeys: string[] = [];
    pageState.selectedItems?.forEach((v, k) => {
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
      await Promise.all(selectedKeys.map((k) => firebaseCallbacks.delete(k)));
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
    await handleGetItems(true);
  };

  const handlePublishItems = async () => {
    const selectedKeys: string[] = [];
    pageState.selectedItems?.forEach((v, k) => {
      if (v === true) selectedKeys.push(k);
    });
    const publishQueue: PublishableItem[] = selectedKeys
      .map((k) => {
        const post = getStore().find((p) => p.id === k && p.isPublished === false);
        if (post) {
          return post;
        }
      })
      .filter((p) => !!p) as PublishableItem[];
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
          return firebaseCallbacks.save(p, p.id, { content: encodeContent(p.content ?? ""), isPublished: true, publishedOn: serverTimestamp() });
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
    await handleGetItems(true);
  };

  const handleUnpublishItems = async () => {
    const selectedKeys: string[] = [];
    pageState.selectedItems?.forEach((v, k) => {
      if (v === true) selectedKeys.push(k);
    });
    const publishQueue: PublishableItem[] = selectedKeys
      .map((k) => {
        const post = getStore().find((p) => p.id === k && p.isPublished === true);
        if (post) {
          return post;
        }
      })
      .filter((p) => !!p) as PublishableItem[];
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
          return firebaseCallbacks.save(p, p.id, { content: encodeContent(p.content ?? ""), isPublished: false, publishedOn: undefined });
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
    await handleGetItems(true);
  };

  useEffect(() => {
    if (!isMountedRef.current) handleGetItems();
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
        <title>{retitle(terminology.pageTitle)}</title>
        <meta property="og:title" content={retitle(terminology.pageTitle)} key="title" />
      </Head>
      <Breadcrumbs
        items={[
          {
            title: "Admin",
            href: "/admin"
          },
          {
            title: terminology.pageTitle
          }
        ]} />
      <NavigationView
        content={(
          <article className="app-page">
            <h2>{terminology.pageTitle}</h2>
            {
              !pageState.isLoading && !pageState.isSuccess
                ? (
                  <Alert variant="error">
                    <span>Failed to fetch {terminology.itemPlural}. Try again.</span>
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
                                <span>Failed to delete selected {terminology.itemPlural}.</span>
                              </Alert>
                            )
                            : (
                              <Alert variant="success">
                                <span>Successfully deleted selected {terminology.itemPlural}.</span>
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
                                <span>Failed to publish selected {terminology.itemPlural}.</span>
                              </Alert>
                            )
                            : (
                              <Alert variant="success">
                                <span>Successfully publish selected {terminology.itemPlural}.</span>
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
                                <span>Failed to unpublish selected {terminology.itemPlural}.</span>
                              </Alert>
                            )
                            : (
                              <Alert variant="success">
                                <span>Successfully unpublish selected {terminology.itemPlural}.</span>
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
                    ? <Link href={`/admin/${terminology.urlSlug}/edit/new`} className={pageState.isLoading ? "disabled" : ""}>New Post</Link>
                    : (
                      <>
                        <Link href="#" onClick={handleDeleteItems} className={!!pageState.isLoading || !pageState.hasSelectedItems ? "disabled" : ""}>Delete Selected</Link>
                        <Link href="#" onClick={handlePublishItems} className={!!pageState.isLoading || !pageState.hasSelectedItems ? "disabled" : ""}>Publish Selected</Link>
                        <Link href="#" onClick={handleUnpublishItems} className={!!pageState.isLoading || !pageState.hasSelectedItems ? "disabled" : ""}>Unpublish Selected</Link>
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
                          handleGetItems(true);
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
                          getStore().map((p: PublishableItem, i: number) => (
                            <li key={p.slug ?? i}>
                              {
                                pageState.inEditMode
                                  ? (
                                    <span className="admin-content-list-checkbox">
                                      <input
                                        type="checkbox"
                                        defaultChecked={pageState.selectedItems?.get(p.id!)}
                                        onClick={() => {
                                          const currentValue = pageState.selectedItems?.get(p.id!) ?? false;
                                          const newSelectionMap = pageState.selectedItems;
                                          newSelectionMap!.set(p.id!, !currentValue);
                                          updatePageState({ selectedItems: newSelectionMap });
                                          handleUpdateSelectedFlag(newSelectionMap!);
                                        }} />
                                    </span>
                                  )
                                  : <></>
                              }
                              <Link href={`/admin/${terminology.urlSlug}/edit/${p.slug}`} className={pageState.inEditMode ? "disabled" : ""} title={p.title}>
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

export default MultiContentList;
