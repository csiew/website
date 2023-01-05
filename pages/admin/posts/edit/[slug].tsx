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

const EditPost = () => {
  const router = useRouter();
  const adminSessionContext = useContext(AdminSessionContext);

  const isMountedRef = useRef<any>(false);
  const titleEditorRef = useRef<any>(null);
  const subtitleEditorRef = useRef<any>(null);
  const contentEditorRef = useRef<any>(null);

  const [slug, setSlug] = useState<string>("");
  const [post, setPost] = useState<BlogPost>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshPostsSuccess, setIsRefreshPostsSuccess] = useState<boolean>(true);
  const [isSearchSuccess, setIsSearchSuccess] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(false);

  const handleEditorChange = () => {
    console.log(contentEditorRef.current.innerText.length);
  };

  const handleGetPosts = async () => {
    console.debug("Fetching posts from Firestore...");
    try {
      const queryResults = await getRemotePosts();
      const extractedPosts = mapDocumentDataToPosts(queryResults.docs.map((d) => d.data()));
      adminSessionContext.posts = extractedPosts;
      setIsRefreshPostsSuccess(true);
      handleGetTargetPost();
    } catch (err) {
      if (config.debugMode) console.error(err);
      setIsRefreshPostsSuccess(true);
    }
    console.debug("Done fetching");
  };

  const handleGetTargetPost = async () => {
    const { slug } = router.query;
    // if (!slug) {
    //   console.error("Cannot find post without slug");
    //   router.push("/admin/posts");
    // }
    setSlug(slug as string);
    console.debug(`Searching for post with slug: ${slug}`);
    setIsLoading(true);
    if (!adminSessionContext.posts.length) {
      await handleGetPosts();
    }
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

  const resetInputValues = (ev?: FormEvent<Element>) => {
    ev?.preventDefault();
    if ([titleEditorRef, subtitleEditorRef, contentEditorRef].some((r) => r.current === null)) return;
    titleEditorRef.current.innerText = post?.title ?? "";
    subtitleEditorRef.current.innerText = post?.subtitle ?? "";
    contentEditorRef.current.innerText = post?.content ?? "";
  };

  useEffect(() => {
    if (!isMountedRef.current) handleGetTargetPost();
    isMountedRef.current = true;
  }, []);

  useEffect(() => {
    if (!isLoading && !!isMountedRef.current) resetInputValues();
  }, [setIsLoading]);

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
              isLoading
                ? <p>Loading...</p>
                : (
                  <Form className="post-editor" onReset={resetInputValues}>
                    <span className="input-group">
                      <span className="input-group-header">
                        <label>Title</label>
                      </span>
                      <pre ref={titleEditorRef} contentEditable>
                        {post?.title ?? ""}
                      </pre>
                    </span>
                    <span className="input-group">
                      <span className="input-group-header">
                        <label>Subtitle</label>
                      </span>
                      <pre ref={subtitleEditorRef} contentEditable>
                        {post?.subtitle ?? ""}
                      </pre>
                    </span>
                    <span className="input-group">
                      <span className="input-group-header">
                        <label>Content</label>
                        <small>
                          <ButtonGroup orientation="horizontal">
                            <Button
                              variant="plain"
                              className={isPreview ? "" : "active"}
                              onClick={(ev?: FormEvent<Element>) => {
                                ev?.preventDefault();
                                setIsPreview(false);
                              }}>
                              Edit
                            </Button>
                            <Button
                              variant="plain"
                              className={isPreview ? "active" : ""}
                              onClick={(ev?: FormEvent<Element>) => {
                                ev?.preventDefault();
                                setIsPreview(true);
                              }}>
                              Preview
                            </Button>
                          </ButtonGroup>
                        </small>
                      </span>
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
                            <pre ref={contentEditorRef} className="multi" onKeyDown={handleEditorChange} contentEditable>
                              {post?.content ?? ""}
                            </pre>
                          )
                      }
                    </span>
                    <span className="form-controls">
                      <Button variant="reset">Reset</Button>
                      <span style={{ width: "100%" }}></span>
                      {
                        post?.isPublished
                          ? <Button variant="plain">Unpublish</Button>
                          : <Button variant="plain">Publish</Button>
                      }
                      <Button variant="submit">Save</Button>
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
