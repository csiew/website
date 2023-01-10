import React, { useContext, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import retitle from "../../../lib/retitle";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import NavigationView from "../../../components/ui/NavigationView";
import Paper from "../../../components/ui/Paper";
import Link from "next/link";
import config from "../../../config";
import Alert from "../../../components/ui/Alert";
import { serverTimestamp } from "@firebase/firestore/lite";
import ContentContext from "../../../stores/content";
import useContentStoreHook from "../../../stores/content/hook";
import { encodeContent } from "../../../lib/encoding";
import { CommitAttemptFlags } from "../../../lib/@types";
import { ProjectV2 } from "../../../lib/projects";
import { deleteProject, saveProject } from "../../../firebase/projects";
import Badge from "../../../components/ui/Badge";
import { capitalize } from "lodash";

const Projects = ({ isLoggedIn }: any) => {
  const router = useRouter();
  const contentContext = useContext(ContentContext);
  const contentStoreHook = useContentStoreHook();
  const isMountedRef = useRef<any>(false);

  const [selectedProjects, setSelectedProjects] = useState<Map<string, boolean>>();
  const [hasSelectedProjects, setHasSelectedProjects] = useState<boolean>(false);
  const [inEditMode, setInEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  const [hasAttemptedCommit, setHasAttemptedCommit] = useState<CommitAttemptFlags>(
    { delete: false, publish: false, unpublish: false }
  );
  const [isPublishSuccess, setIsPublishSuccess] = useState<boolean>(false);
  const [isUnpublishSuccess, setIsUnpublishSuccess] = useState<boolean>(false);
  const [isDeletionSuccess, setIsDeletionSuccess] = useState<boolean>(false);

  const handleGetProjects = async (force?: boolean) => {
    if (!!force || !contentContext.projects.length) {
      setIsLoading(true);
      try {
        await contentStoreHook.getProjects(force);
        setIsSuccess(true);
      } catch (err) {
        if (config.debugMode) console.error(err);
        setIsSuccess(true);
      } finally {
        setIsLoading(false);
      }
    }
    const selectionMap = new Map<string, boolean>();
    contentContext.projects.map((p) => selectionMap.set(p.id!, false));
    setSelectedProjects(selectionMap);
    setIsSuccess(true);
    console.debug("Done fetching");
  };

  const handleUpdateSelectedFlag = (selectionMap: Map<string, boolean>) => {
    const selectedKeys: string[] = [];
    selectionMap?.forEach((v, k) => {
      if (v === true) selectedKeys.push(k);
    });
    setHasSelectedProjects(selectedKeys.length > 0);
  };

  const handleDeleteProjects = async () => {
    const selectedKeys: string[] = [];
    selectedProjects?.forEach((v, k) => {
      if (v === true) selectedKeys.push(k);
    });
    setIsLoading(true);
    setHasAttemptedCommit({ delete: true, publish: false, unpublish: false });
    try {
      await Promise.all(selectedKeys.map((k) => deleteProject(k)));
      setIsDeletionSuccess(true);
      setInEditMode(false);
    } catch (err) {
      if (config.debugMode) console.error(err);
      setIsDeletionSuccess(false);
    } finally {
      setIsLoading(false);
    }
    await handleGetProjects(true);
  };

  const handlePublishProjects = async () => {
    const selectedKeys: string[] = [];
    selectedProjects?.forEach((v, k) => {
      if (v === true) selectedKeys.push(k);
    });
    const publishQueue: ProjectV2[] = selectedKeys
      .map((k) => {
        const project = contentContext.projects.find((p) => p.id === k && p.isPublished === false);
        if (project) {
          return project;
        }
      })
      .filter((p) => !!p) as ProjectV2[];
    setIsLoading(true);
    setHasAttemptedCommit({ delete: false, publish: true, unpublish: false });
    try {
      await Promise.all(
        publishQueue.map((p) => {
          return saveProject(p, p.id, { description: encodeContent(p.description ?? ""), isPublished: true, publishedOn: serverTimestamp() });
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
    await handleGetProjects(true);
  };

  const handleUnpublishProjects = async () => {
    const selectedKeys: string[] = [];
    selectedProjects?.forEach((v, k) => {
      if (v === true) selectedKeys.push(k);
    });
    const publishQueue: ProjectV2[] = selectedKeys
      .map((k) => {
        const post = contentContext.projects.find((p) => p.id === k && p.isPublished === true);
        if (post) {
          return post;
        }
      })
      .filter((p) => !!p) as ProjectV2[];
    setIsLoading(true);
    setHasAttemptedCommit({ delete: false, publish: false, unpublish: true });
    try {
      await Promise.all(
        publishQueue.map((p) => {
          return saveProject(p, p.id, { description: encodeContent(p.description ?? ""), isPublished: false, publishedOn: undefined });
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
    await handleGetProjects(true);
  };

  useEffect(() => {
    if (!isMountedRef.current) handleGetProjects();
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
        <title>{retitle("Projects")}</title>
        <meta property="og:title" content={retitle("Projects")} key="title" />
      </Head>
      <Breadcrumbs
        items={[
          {
            title: "Admin",
            href: "/admin"
          },
          {
            title: "Projects"
          }
        ]} />
      <NavigationView
        content={(
          <article className="appPage">
            <h2>Projects</h2>
            {
              !isLoading && !isSuccess
                ? (
                  <Alert variant="error">
                    Failed to fetch projects. Try again.
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
                                Failed to delete selected projects.
                              </Alert>
                            )
                            : (
                              <Alert variant="success">
                                Successfully deleted selected projects.
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
                                Failed to publish selected projects.
                              </Alert>
                            )
                            : (
                              <Alert variant="success">
                                Successfully publish selected projects.
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
                                Failed to unpublish selected projects.
                              </Alert>
                            )
                            : (
                              <Alert variant="success">
                                Successfully unpublish selected projects.
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
                  !inEditMode
                    ? <Link href="/admin/projects/edit/new" className={isLoading ? "disabled" : ""}>New Project</Link>
                    : (
                      <>
                        <Link href="#" onClick={handleDeleteProjects} className={!!isLoading || !hasSelectedProjects ? "disabled" : ""}>Delete Selected</Link>
                        <Link href="#" onClick={handlePublishProjects} className={!!isLoading || !hasSelectedProjects ? "disabled" : ""}>Publish Selected</Link>
                        <Link href="#" onClick={handleUnpublishProjects} className={!!isLoading || !hasSelectedProjects ? "disabled" : ""}>Unpublish Selected</Link>
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
                          handleGetProjects(true);
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
                    <section className="admin-content-list">
                      <ul>
                        {
                          contentContext.projects.map((p: ProjectV2, i: number) => (
                            <li key={p.slug ?? i}>
                              {
                                inEditMode
                                  ? (
                                    <span className="admin-content-list-checkbox">
                                      <input
                                        type="checkbox"
                                        defaultChecked={selectedProjects?.get(p.id!)}
                                        onClick={() => {
                                          const currentValue = selectedProjects?.get(p.id!) ?? false;
                                          const newSelectionMap = selectedProjects;
                                          newSelectionMap!.set(p.id!, !currentValue);
                                          setSelectedProjects(newSelectionMap);
                                          handleUpdateSelectedFlag(newSelectionMap!);
                                        }} />
                                    </span>
                                  )
                                  : <></>
                              }
                              <Link href={`/admin/projects/edit/${p.slug}`} className={inEditMode ? "disabled" : ""} title={p.name}>
                                <h3>{p.name}</h3>
                                <Badge>{capitalize(p.status)}</Badge>
                                {p.startYear && <sub>{[p.startYear, p.endYear ? (p.startYear === p.endYear ? null : p.endYear) : (p.status === "inactive" ? null : "Present")].filter((y) => !!y).join(" - ")}</sub>}
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

export default Projects;
