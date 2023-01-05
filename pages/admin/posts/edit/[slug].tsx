import React, { useContext, useEffect, useRef, useState } from "react";
import Head from "next/head";
import retitle from "../../../../lib/retitle";
import Breadcrumbs from "../../../../components/ui/Breadcrumbs";
import NavigationView from "../../../../components/ui/NavigationView";
import { useRouter } from "next/router";
import { BlogPost } from "../../../../lib/blog";
import { getRemotePosts, mapDocumentDataToPosts } from "../../../../firebase/posts";
import { AdminSessionContext } from "../..";
import config from "../../../../config";

const EditPost = ({ isLoggedIn }: any) => {
  const router = useRouter();
  const adminSessionContext = useContext(AdminSessionContext);

  const titleEditorRef = useRef<any>(null);
  const subtitleEditorRef = useRef<any>(null);
  const contentEditorRef = useRef<any>(null);

  const [slug, setSlug] = useState<string>("");
  const [post, setPost] = useState<BlogPost>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [isSearchSuccess, setIsSearchSuccess] = useState<boolean>(false);

  const handleEditorChange = () => {
    console.log(contentEditorRef.current.innerText.length);
  };

  const handleGetTargetPost = (slug: string) => {
    setIsLoading(true);
    const targetPost = adminSessionContext.posts.find((p) => p.slug === slug);
    if (!targetPost) {
      setIsSearchSuccess(false);
    } else {
      setPost(targetPost);
      console.debug({ targetPost });
      setIsSearchSuccess(true);
    }
    setIsLoading(false);
  };

  const handleGetPosts = async () => {
    console.debug("Fetching posts from Firestore...");
    setIsLoading(true);
    try {
      const queryResults = await getRemotePosts();
      const extractedPosts = mapDocumentDataToPosts(queryResults.docs.map((d) => d.data()));
      adminSessionContext.posts = extractedPosts;
      setPosts(extractedPosts);
      setIsSuccess(true);
      handleGetTargetPost(slug);
    } catch (err) {
      if (config.debugMode) console.error(err);
      setIsSuccess(true);
    } finally {
      setIsLoading(false);
    }
    console.debug("Done fetching");
  };

  useEffect(() => {
    const { slug } = router.query;
    setSlug(slug as string);
    console.debug({ slug });
    if (!adminSessionContext.posts.length) {
      handleGetPosts();
    } else {
      handleGetTargetPost(slug as string);
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
            title: "Post Composer"
          }
        ]} />
      <NavigationView
        content={(
          <article className="topLevelPage">
            {
              isLoading
                ? <p>Loading...</p>
                : (
                  <section className="post-editor">
                    <span className="input-group">
                      <label>Title</label>
                      <pre ref={titleEditorRef} contentEditable>
                        {post?.title ?? ""}
                      </pre>
                    </span>
                    <span className="input-group">
                      <label>Subtitle</label>
                      <pre ref={subtitleEditorRef} contentEditable>
                        {post?.subtitle ?? ""}
                      </pre>
                    </span>
                    <span className="input-group">
                      <label>Content</label>
                      <pre ref={contentEditorRef} className="multi" onKeyDown={handleEditorChange} contentEditable>
                        {decodeURI(post?.content ?? "")}
                      </pre>
                    </span>
                  </section>
                )
            }
          </article>
        )} />
    </>
  );
};

export default EditPost;
