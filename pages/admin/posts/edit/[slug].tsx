import React, { FormEvent, useContext, useEffect, useRef, useState } from "react";
import Head from "next/head";
import retitle from "../../../../lib/retitle";
import Breadcrumbs from "../../../../components/ui/Breadcrumbs";
import NavigationView from "../../../../components/ui/NavigationView";
import { useRouter } from "next/router";
import { BlogPost } from "../../../../lib/blog";
import { getRemotePosts, mapDocumentDataToPosts } from "../../../../firebase/posts";
import { AdminSessionContext } from "../..";
import config from "../../../../config";
import ButtonGroup from "../../../../components/ui/ButtonGroup";
import Button from "../../../../components/ui/Button";
import ReactMarkdown from "react-markdown";
import Paper from "../../../../components/ui/Paper";
import Form from "../../../../components/ui/Form";
import Alert from "../../../../components/ui/Alert";
import firebaseAppInstance from "../../../../firebase";
import { doc, serverTimestamp, Timestamp, updateDoc } from "@firebase/firestore/lite";
import FormQuestion from "../../../../components/ui/Form/FormQuestion";

const EditPost = () => {
  const router = useRouter();
  const adminSessionContext = useContext(AdminSessionContext);

  const isMountedRef = useRef<any>(false);
  const titleEditorRef = useRef<any>(null);
  const subtitleEditorRef = useRef<any>(null);
  const contentEditorRef = useRef<any>(null);

  const [slug, setSlug] = useState<string>("");
  const [post, setPost] = useState<BlogPost>();
  const [isNewPost, setIsNewPost] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshPostsSuccess, setIsRefreshPostsSuccess] = useState<boolean>(true);
  const [isSearchSuccess, setIsSearchSuccess] = useState<boolean>(false);
  const [hasAttemptedSave, setHasAttemptedSave] = useState<boolean>(false);
  const [isSavingSuccess, setIsSavingSuccess] = useState<boolean>(false);

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

  const handleGetTargetPost = async () => {
    const { slug } = router.query;
    setSlug(slug as string);
    setIsLoading(true);
    if (!adminSessionContext.posts.length) {
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

  const handleSubmit = async (ev: FormEvent<Element>, isPublished?: boolean) => {
    ev.preventDefault();

    const updatedPost = { ...post } as { [k: string]: any };
    updatedPost.title = titleEditorRef.current.value;
    updatedPost.subtitle = subtitleEditorRef.current.value;
    updatedPost.content = Buffer.from(contentEditorRef.current.value).toString("base64");
    updatedPost.isPublished = isPublished ?? post?.isPublished ?? false;
    updatedPost.publishedOn = post?.isPublished ? Timestamp.fromDate(post?.publishedOn as Date): serverTimestamp();
    updatedPost.lastModified = serverTimestamp();

    setIsLoading(true);
    setHasAttemptedSave(true);
    try {
      const docReference = doc(firebaseAppInstance.db, "posts", updatedPost.id);
      await updateDoc(docReference, updatedPost);
      await handleGetPosts();
      setIsSavingSuccess(true);
    } catch (err) {
      if (config.debugMode) console.error(err);
      setIsSavingSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const resetInputValues = (ev?: FormEvent<Element>) => {
    ev?.preventDefault();
    if (!post || [titleEditorRef, subtitleEditorRef, contentEditorRef].some((r) => r.current === null)) return;
    titleEditorRef.current.value = post?.title ?? "";
    subtitleEditorRef.current.value = post?.subtitle ?? "";
    contentEditorRef.current.value = post?.content ?? "";
  };

  useEffect(() => {
    if (!isMountedRef.current) handleGetTargetPost();
    isMountedRef.current = true;
  }, []);

  useEffect(() => {
    if (!isLoading && !!isMountedRef.current) resetInputValues();
  }, [handleGetTargetPost]);

  useEffect(() => resetInputValues(), [setPost]);

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
        content={(
          <article className="topLevelPage">
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
              !isSavingSuccess && hasAttemptedSave
                ? (
                  <Alert variant="error">
                    <span>Failed to save post.</span>
                  </Alert>
                )
                : <></>
            }
            {
              isLoading
                ? <p>Loading...</p>
                : (
                  <Form
                    className="post-editor"
                    onSubmit={(ev: FormEvent<Element>) => handleSubmit(ev, true)}
                    onReset={resetInputValues}>
                    <FormQuestion
                      variant="text"
                      label="Title"
                      forwardedRef={titleEditorRef} />
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
                            setIsPreview(true);
                          }}>
                          Preview
                        </Button>
                      </ButtonGroup>
                    </small>
                    {
                      isPreview
                        ? (
                          <Paper>
                            <ReactMarkdown>
                              {post?.content ?? ""}
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
                )
            }
          </article>
        )} />
    </>
  );
};

export default EditPost;
