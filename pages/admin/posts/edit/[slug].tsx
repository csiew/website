import React, { FormEvent, useContext, useEffect, useRef, useState } from "react";
import Head from "next/head";
import retitle from "../../../../lib/retitle";
import Breadcrumbs from "../../../../components/ui/Breadcrumbs";
import NavigationView from "../../../../components/ui/NavigationView";
import { useRouter } from "next/router";
import { BlogPost } from "../../../../lib/blog";
import { encodeContent, getRemotePosts, mapDocumentDataToPosts, savePost } from "../../../../firebase/posts";
import { AdminSessionContext } from "../..";
import config from "../../../../config";
import ButtonGroup from "../../../../components/ui/ButtonGroup";
import Button from "../../../../components/ui/Button";
import ReactMarkdown from "react-markdown";
import Paper from "../../../../components/ui/Paper";
import Form from "../../../../components/ui/Form";
import Alert from "../../../../components/ui/Alert";
import firebaseAppInstance from "../../../../firebase";
import { addDoc, collection, doc, serverTimestamp, Timestamp, updateDoc } from "@firebase/firestore/lite";
import FormQuestion from "../../../../components/ui/Form/FormQuestion";

const EditPost = ({ isLoggedIn }: any) => {
  const router = useRouter();
  const adminSessionContext = useContext(AdminSessionContext);

  const isMountedRef = useRef<any>(false);
  const slugEditorRef = useRef<any>(null);
  const titleEditorRef = useRef<any>(null);
  const subtitleEditorRef = useRef<any>(null);
  const contentEditorRef = useRef<any>(null);

  const [slug, setSlug] = useState<string>("");
  const [post, setPost] = useState<BlogPost>();
  const [localPostCache, setLocalPostCache] = useState<BlogPost | undefined>();
  const [isNewPost, setIsNewPost] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshPostsSuccess, setIsRefreshPostsSuccess] = useState<boolean>(true);
  const [isSearchSuccess, setIsSearchSuccess] = useState<boolean>(false);
  const [hasAttemptedSave, setHasAttemptedSave] = useState<boolean>(false);
  const [isSavingSuccess, setIsSavingSuccess] = useState<boolean>(false);

  const cacheLocalChanges = (): BlogPost => {
    const cachedPost: BlogPost = {
      ...post as BlogPost,
      slug: slugEditorRef.current.value as string,
      title: titleEditorRef.current.value as string,
      subtitle: subtitleEditorRef.current.value as string,
      content: contentEditorRef.current.value as string
    };
    setLocalPostCache(cachedPost);
    return cachedPost;
  };

  const handleGetPosts = async () => {
    console.debug("Fetching posts from Firestore...");
    try {
      const queryResults = await getRemotePosts();
      const extractedPosts = mapDocumentDataToPosts(queryResults.docs.map((d) => ({ id: d.id, ...d.data() })));
      adminSessionContext.posts = extractedPosts;
      setIsRefreshPostsSuccess(true);
    } catch (err) {
      if (config.debugMode) console.error(err);
      setIsRefreshPostsSuccess(true);
    }
    console.debug("Done fetching");
  };

  const handleGetTargetPost = async (force?: boolean) => {
    const { slug } = router.query;
    setSlug(slug as string);
    setIsLoading(true);
    if (slug === "new") {
      setIsNewPost(true);

      const newPost: BlogPost = {
        slug: "",
        title: "",
        subtitle: "",
        content: "",
        author: "Clarence Siew",
        createdAt: new Date(Date.now()),
        isPublished: false
      };
      setPost(newPost);
      setLocalPostCache(newPost);

      setIsSearchSuccess(true);
      setIsLoading(false);

      return;
    }
    if (force || !adminSessionContext.posts.length) {
      await handleGetPosts();
    }
    console.debug(`Searching for post with slug: ${slug}`);
    const targetPost = adminSessionContext.posts.find((p) => p.slug === slug);
    if (!targetPost) {
      setIsSearchSuccess(false);
    } else {
      setPost(targetPost);
      setIsSearchSuccess(true);
    }
    setIsLoading(false);
    console.debug("Done searching for post");
  };

  const determinePublishDate = (post: BlogPost, isPublished: boolean) => {
    if (isPublished) {
      if (post.publishedOn) {
        return Timestamp.fromDate(post.publishedOn as Date);
      } else {
        return serverTimestamp();
      }
    } else {
      return;
    }
  };

  const handleSubmit = async (ev: FormEvent<Element>, isPublished?: boolean) => {
    ev.preventDefault();

    const cachedPost = cacheLocalChanges();

    console.debug("Cached post");

    const updatedPost = { ...cachedPost } as { [k: string]: any };
    updatedPost.content = cachedPost.content ? encodeContent(cachedPost.content) : "";
    updatedPost.isPublished = isPublished ?? cachedPost.isPublished ?? false;
    const publishedOn = determinePublishDate(cachedPost, isPublished ?? false);
    if (!publishedOn) {
      delete updatedPost.publishedOn;
    } else {
      updatedPost.publishedOn = publishedOn;
    }
    updatedPost.lastModified = serverTimestamp();

    console.debug("Created updated post");

    setIsLoading(true);
    setHasAttemptedSave(true);
    try {
      if (isNewPost) {
        await savePost(updatedPost);
      } else {
        await savePost(updatedPost, updatedPost.id);
        await handleGetTargetPost(true);
      }
      setIsSavingSuccess(true);
      if (isNewPost) {
        setIsNewPost(false);
        router.replace(`/admin/posts/edit/${cachedPost?.slug}`);
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
    if (!post || [titleEditorRef, subtitleEditorRef, contentEditorRef].some((r) => r.current === null)) return;
    if (force || !localPostCache) {
      console.debug("Loading post data from shared context");
      slugEditorRef.current.value = post?.slug ?? "";
      titleEditorRef.current.value = post?.title ?? "";
      subtitleEditorRef.current.value = post?.subtitle ?? "";
      contentEditorRef.current.value = post?.content ?? "";
    } else {
      console.debug("Loading post data from local state cache");
      slugEditorRef.current.value = localPostCache.slug;
      titleEditorRef.current.value = localPostCache.title;
      subtitleEditorRef.current.value = localPostCache.subtitle;
      contentEditorRef.current.value = localPostCache.content;
    }
  };

  useEffect(() => {
    if (!isMountedRef.current) handleGetTargetPost();
    isMountedRef.current = true;
  }, []);

  useEffect(() => {
    if (!isLoading && !!isMountedRef.current && !isPreview) resetInputValues();
  }, [handleGetTargetPost, setIsPreview]);

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
        <title>{retitle("Edit Post")}</title>
        <meta property="og:title" content={retitle("Edit Post")} key="title" />
      </Head>
      <Breadcrumbs
        items={[
          {
            title: "Admin",
            href: "/admin"
          },
          {
            title: "Posts",
            href: "/admin/posts"
          },
          {
            title: "Editor"
          }
        ]} />
      <NavigationView
        contentStyle={{ paddingInline: "0.75rem" }}
        content={(
          <article className="topLevelPage" style={{ maxWidth: "1024px" }}>
            {
              !isLoading
                ? (
                  <>
                    {
                      !isRefreshPostsSuccess
                        ? (
                          <Alert variant="error">
                            <span>Failed to reload posts from Firebase.</span>
                          </Alert>
                        )
                        : <></>
                    }
                    {
                      !isSearchSuccess
                        ? (
                          <Alert variant="error">
                            <span>Failed to find post with slug: {slug}</span>
                          </Alert>
                        )
                        : <></>
                    }
                    {
                      hasAttemptedSave
                        ? !isSavingSuccess
                          ? (
                            <Alert variant="error">
                              <span>Failed to save post.</span>
                            </Alert>
                          )
                          : (
                            <Alert variant="success">
                              <span>Successfully saved post!</span>
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
                          <span>{post?.isPublished ? "Yes" : "No"}</span>
                        </div>
                        {
                          post?.isPublished && post?.publishedOn
                            ? (
                              <div className="post-metadata-group">
                                <label>Published on</label>
                                <span>{post?.publishedOn.toLocaleString()}</span>
                              </div>
                            )
                            : <></>
                        }
                        <div className="post-metadata-group">
                          <label>Last modified at</label>
                          <span>{post?.lastModified?.toLocaleString()}</span>
                        </div>
                        <div className="post-metadata-group">
                          <label>Created at</label>
                          <span>{post?.createdAt.toLocaleString()}</span>
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
                        label="Title"
                        forwardedRef={titleEditorRef}
                        required />
                      <FormQuestion
                        variant="text"
                        label="Subtitle"
                        forwardedRef={subtitleEditorRef} />
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
                                {localPostCache?.content ?? post?.content ?? ""}
                              </ReactMarkdown>
                            </Paper>
                          )
                          : (
                            <FormQuestion
                              variant="multiline"
                              label="Content"
                              forwardedRef={contentEditorRef} />
                          )
                      }
                      <span className="form-controls">
                        <Button variant="reset">Reset</Button>
                        <span style={{ width: "100%" }}></span>
                        {
                          post?.isPublished
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

export default EditPost;
