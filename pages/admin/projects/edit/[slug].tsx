import React, { FormEvent, useContext, useEffect, useRef, useState } from "react";
import Head from "next/head";
import retitle from "../../../../lib/retitle";
import Breadcrumbs from "../../../../components/ui/Breadcrumbs";
import NavigationView from "../../../../components/ui/NavigationView";
import { useRouter } from "next/router";
import config from "../../../../config";
import ButtonGroup from "../../../../components/ui/ButtonGroup";
import Button from "../../../../components/ui/Button";
import ReactMarkdown from "react-markdown";
import Paper from "../../../../components/ui/Paper";
import Form from "../../../../components/ui/Form";
import Alert from "../../../../components/ui/Alert";
import { serverTimestamp, Timestamp } from "@firebase/firestore/lite";
import FormQuestion from "../../../../components/ui/Form/FormQuestion";
import ContentContext from "../../../../stores/content";
import useContentStoreHook from "../../../../stores/content/hook";
import { encodeContent } from "../../../../lib/encoding";
import { ProjectV2 } from "../../../../lib/projects";
import { saveProject } from "../../../../firebase/projects";

const EditProject = ({ isLoggedIn }: any) => {
  const router = useRouter();
  const contentStoreHook = useContentStoreHook();
  const contentContext = useContext(ContentContext);

  const isMountedRef = useRef<any>(false);
  const slugEditorRef = useRef<any>(null);
  const nameEditorRef = useRef<any>(null);
  const startYearEditorRef = useRef<any>(null);
  const endYearEditorRef = useRef<any>(null);
  const statusEditorRef = useRef<any>(null);
  const imgUrlEditorRef = useRef<any>(null);
  const siteUrlEditorRef = useRef<any>(null);
  const gitRepoUrlEditorRef = useRef<any>(null);
  const descriptionEditorRef = useRef<any>(null);

  const [slug, setSlug] = useState<string>("");
  const [project, setProject] = useState<ProjectV2>();
  const [localPostCache, setLocalPostCache] = useState<ProjectV2 | undefined>();
  const [isNewProject, setIsNewProject] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshProjectsSuccess, setIsRefreshProjectsSuccess] = useState<boolean>(true);
  const [isSearchSuccess, setIsSearchSuccess] = useState<boolean>(false);
  const [hasAttemptedSave, setHasAttemptedSave] = useState<boolean>(false);
  const [isSavingSuccess, setIsSavingSuccess] = useState<boolean>(false);

  const cacheLocalChanges = (): ProjectV2 => {
    const cachedProject: ProjectV2 = {
      ...project as ProjectV2,
      slug: slugEditorRef.current.value as string,
      name: nameEditorRef.current.value as string,
      startYear: startYearEditorRef.current.value as string,
      endYear: endYearEditorRef.current.value as string,
      status: statusEditorRef.current.value as string,
      imgUrl: imgUrlEditorRef.current.value as string,
      siteUrl: siteUrlEditorRef.current.value as string,
      gitRepoUrl: gitRepoUrlEditorRef.current.value as string,
      description: descriptionEditorRef.current.value as string
    };
    setLocalPostCache(cachedProject);
    return cachedProject;
  };

  const handleGetProjects = async () => {
    try {
      await contentStoreHook.getProjects();
      setIsRefreshProjectsSuccess(true);
    } catch (err) {
      if (config.debugMode) console.error(err);
      setIsRefreshProjectsSuccess(true);
    }
  };

  const handleGetTargetProject = async (force?: boolean) => {
    const { slug } = router.query;
    setSlug(slug as string);
    setIsLoading(true);
    if (slug === "new") {
      setIsNewProject(true);

      const newProject: ProjectV2 = {
        slug: "",
        name: "",
        startYear: new Date(Date.now()).getFullYear().toString(),
        endYear: "",
        status: "active",
        description: "",
        imgUrl: "",
        siteUrl: "",
        gitRepoUrl: "",
        createdAt: new Date(Date.now()),
        isPublished: false
      };
      setProject(newProject);
      setLocalPostCache(newProject);

      setIsSearchSuccess(true);
      setIsLoading(false);

      return;
    }
    if (force || !contentContext.projects.length) {
      await handleGetProjects();
    }
    console.debug(`Searching for project with slug: ${slug}`);
    const targetProject = contentContext.projects.find((p) => p.slug === slug);
    if (!targetProject) {
      setIsSearchSuccess(false);
    } else {
      setProject(targetProject);
      setIsSearchSuccess(true);
    }
    setIsLoading(false);
    console.debug("Done searching for project");
  };

  const determinePublishDate = (project: ProjectV2, isPublished: boolean) => {
    if (isPublished) {
      if (project.publishedOn) {
        return Timestamp.fromDate(project.publishedOn as Date);
      } else {
        return serverTimestamp();
      }
    } else {
      return;
    }
  };

  const handleSubmit = async (ev: FormEvent<Element>, isPublished?: boolean) => {
    ev.preventDefault();

    const cachedProject = cacheLocalChanges();

    console.debug("Cached post");

    const updatedProject = { ...cachedProject } as { [k: string]: any };
    updatedProject.description = cachedProject.description ? encodeContent(cachedProject.description) : "";
    updatedProject.isPublished = isPublished ?? cachedProject.isPublished ?? false;
    const publishedOn = determinePublishDate(cachedProject, isPublished ?? false);
    if (!publishedOn) {
      delete updatedProject.publishedOn;
    } else {
      updatedProject.publishedOn = publishedOn;
    }
    updatedProject.lastModified = serverTimestamp();

    ["endYear", "imgUrl", "siteUrl", "gitRepoUrl"].map((k) => {
      if (updatedProject[k].length === 0) {
        delete updatedProject[k];
      }
    });

    console.debug("Created updated project");

    setIsLoading(true);
    setHasAttemptedSave(true);
    try {
      if (isNewProject) {
        await saveProject(updatedProject);
      } else {
        await saveProject(updatedProject, updatedProject.id);
        await handleGetTargetProject(true);
      }
      setIsSavingSuccess(true);
      if (isNewProject) {
        setIsNewProject(false);
        router.replace(`/admin/projects/edit/${updatedProject?.slug}`);
      }
    } catch (err) {
      if (config.debugMode) console.error(err);
      setIsSavingSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAlertStates = () => {
    setHasAttemptedSave(false);
    setIsSavingSuccess(false);
  };

  const resetInputValues = (ev?: FormEvent<Element>, force?: boolean) => {
    ev?.preventDefault();
    if (
      !project ||
      [
        slugEditorRef,
        nameEditorRef,
        startYearEditorRef,
        endYearEditorRef,
        statusEditorRef,
        imgUrlEditorRef,
        siteUrlEditorRef,
        gitRepoUrlEditorRef,
        descriptionEditorRef
      ].some((r) => r.current === null)
    ) return;
    if (force || !localPostCache) {
      console.debug("Loading post data from shared context");
      slugEditorRef.current.value = project?.slug ?? "";
      nameEditorRef.current.value = project?.name ?? "";
      startYearEditorRef.current.value = project?.startYear ?? new Date(Date.now()).getFullYear().toString();
      endYearEditorRef.current.value = project?.endYear ?? "";
      statusEditorRef.current.value = project?.status ?? "active";
      imgUrlEditorRef.current.value = project?.imgUrl ?? "";
      siteUrlEditorRef.current.value = project?.siteUrl ?? "";
      gitRepoUrlEditorRef.current.value = project?.gitRepoUrl ?? "";
      descriptionEditorRef.current.value = project?.description ?? "";
    } else {
      console.debug("Loading post data from local state cache");
      slugEditorRef.current.value = localPostCache.slug;
      nameEditorRef.current.value = localPostCache.name;
      startYearEditorRef.current.value = localPostCache.startYear;
      endYearEditorRef.current.value = localPostCache.endYear;
      statusEditorRef.current.value = localPostCache.status;
      imgUrlEditorRef.current.value = localPostCache.imgUrl;
      siteUrlEditorRef.current.value = localPostCache.siteUrl;
      gitRepoUrlEditorRef.current.value = localPostCache.gitRepoUrl;
      descriptionEditorRef.current.value = localPostCache.description;
    }
  };

  useEffect(() => {
    if (!isMountedRef.current) handleGetTargetProject();
    isMountedRef.current = true;
  }, [contentContext.posts]);

  useEffect(() => {
    if (!isLoading && !!isMountedRef.current && !isPreview) resetInputValues();
  }, [handleGetTargetProject, setIsPreview]);

  useEffect(() => {
    if (!isLoading && !!isMountedRef.current) resetAlertStates();
  }, [setLocalPostCache]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/admin");
    }
  }, [isLoggedIn]);

  return (
    <>
      <Head>
        <title>{retitle("Edit Project")}</title>
        <meta property="og:title" content={retitle("Edit Project")} key="title" />
      </Head>
      <Breadcrumbs
        items={[
          {
            title: "Admin",
            href: "/admin"
          },
          {
            title: "Projects",
            href: "/admin/projects"
          },
          {
            title: "Editor"
          }
        ]} />
      <NavigationView
        contentStyle={{ paddingInline: "0.75rem" }}
        content={(
          <article className="app-page" style={{ maxWidth: "1024px" }}>
            {
              !isLoading
                ? (
                  <>
                    {
                      !isRefreshProjectsSuccess
                        ? (
                          <Alert variant="error">
                            <span>Failed to reload projects from Firebase.</span>
                          </Alert>
                        )
                        : <></>
                    }
                    {
                      !isSearchSuccess
                        ? (
                          <Alert variant="error">
                            <span>Failed to find project with slug: {slug}</span>
                          </Alert>
                        )
                        : <></>
                    }
                    {
                      hasAttemptedSave
                        ? !isSavingSuccess
                          ? (
                            <Alert variant="error">
                              <span>Failed to save project.</span>
                            </Alert>
                          )
                          : (
                            <Alert variant="success">
                              <span>Successfully saved project!</span>
                            </Alert>
                          )
                        : <></>
                    }
                  </>
                )
                : <></>
            }
            {
              isLoading
                ? <p>Loading...</p>
                : (
                  <>
                    <Paper style={{ width: "100%", marginBottom: "1rem" }}>
                      <div className="post-metadata">
                        <div className="post-metadata-group">
                          <label>Published</label>
                          <span>{project?.isPublished ? "Yes" : "No"}</span>
                        </div>
                        {
                          project?.isPublished && project?.publishedOn
                            ? (
                              <div className="post-metadata-group">
                                <label>Published on</label>
                                <span>{project?.publishedOn.toLocaleString()}</span>
                              </div>
                            )
                            : <></>
                        }
                        <div className="post-metadata-group">
                          <label>Last modified at</label>
                          <span>{project?.lastModified?.toLocaleString()}</span>
                        </div>
                        <div className="post-metadata-group">
                          <label>Created at</label>
                          <span>{project?.createdAt.toLocaleString()}</span>
                        </div>
                      </div>
                    </Paper>
                    <Form
                      className="post-editor"
                      onSubmit={(ev: FormEvent<Element>) => handleSubmit(ev, true)}
                      onReset={(ev: FormEvent<Element>) => resetInputValues(ev, true)}>
                      <FormQuestion
                        variant="text"
                        label="URL Slug"
                        forwardedRef={slugEditorRef}
                        required />
                      <FormQuestion
                        variant="text"
                        label="Name"
                        forwardedRef={nameEditorRef}
                        required />
                      <FormQuestion
                        variant="text"
                        label="Start Year"
                        forwardedRef={startYearEditorRef}
                        required />
                      <FormQuestion
                        variant="text"
                        label="End Year"
                        forwardedRef={endYearEditorRef} />
                      <FormQuestion
                        variant="text"
                        label="Status"
                        forwardedRef={statusEditorRef}
                        required />
                      <FormQuestion
                        variant="text"
                        label="Image URL"
                        forwardedRef={imgUrlEditorRef} />
                      <FormQuestion
                        variant="text"
                        label="Website URL"
                        forwardedRef={siteUrlEditorRef} />
                      <FormQuestion
                        variant="text"
                        label="Git Repository URL"
                        forwardedRef={gitRepoUrlEditorRef} />
                      <small>
                        <ButtonGroup orientation="horizontal">
                          <Button
                            variant="plain"
                            className={isPreview ? "" : "active"}
                            onClick={(ev: FormEvent<Element>) => {
                              ev.preventDefault();
                              setIsPreview(false);
                            }}>
                            Edit
                          </Button>
                          <Button
                            variant="plain"
                            className={isPreview ? "active" : ""}
                            onClick={(ev: FormEvent<Element>) => {
                              ev.preventDefault();
                              cacheLocalChanges();
                              setIsPreview(true);
                            }}>
                            Preview
                          </Button>
                        </ButtonGroup>
                      </small>
                      {
                        isPreview
                          ? (
                            <Paper style={{ width: "100%", minHeight: "200px" }}>
                              <ReactMarkdown>
                                {localPostCache?.description ?? project?.description ?? ""}
                              </ReactMarkdown>
                            </Paper>
                          )
                          : (
                            <FormQuestion
                              variant="multiline"
                              label="Description"
                              forwardedRef={descriptionEditorRef} />
                          )
                      }
                      <span className="form-controls">
                        <Button variant="reset">Reset</Button>
                        <span style={{ width: "100%" }}></span>
                        {
                          project?.isPublished
                            ? <></>
                            : (
                              <Button
                                variant="plain"
                                onClick={(ev: FormEvent<Element>) => handleSubmit(ev, false)}>
                                Save as draft
                              </Button>
                            )
                        }
                        <Button variant="submit">Publish</Button>
                      </span>
                    </Form>
                  </>
                )
            }
          </article>
        )} />
    </>
  );
};

export default EditProject;
