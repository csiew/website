import React, { useEffect, useState } from "react";
import Head from "next/head";
import retitle from "../../lib/retitle";
import NavigationView from "../../components/ui/NavigationView";

type BlogPostFormState = {
  title: string;
  subtitle: string;
  quotesAsNotes: "true" | "false";
  tags: string[];
  body: string;
};

function BlogPostForm({
  setItemBody
}: {
  setItemBody: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [blogPost, setBlogPost] = useState<BlogPostFormState>({
    title: "",
    subtitle: "",
    quotesAsNotes: "true",
    tags: [],
    body: ""
  });

  function handleChange(field: string, content: string | string[] | boolean) {
    const updatedBlogPost = { ...blogPost } as any;
    updatedBlogPost[field] = content;
    setBlogPost(updatedBlogPost);
    setItemBody(JSON.stringify(updatedBlogPost));
  }

  useEffect(() => {
    console.debug({ blogPost });
  }, [blogPost]);

  return (
    <>
      <span className="form-field">
        <label htmlFor="blog-post-title">
          Title
        </label>
        <input
          type="text"
          name="blog-post-title"
          defaultValue={blogPost.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </span>
      <span className="form-field">
        <label htmlFor="blog-post-subtitle">
          Subtitle
        </label>
        <input
          type="text"
          defaultValue={blogPost.subtitle}
          onChange={(e) => handleChange("subtitle", e.target.value)}
        />
      </span>
      <span className="form-field form-field-checkbox">
        <input
          type="checkbox"
          name="quotes-as-notes"
          defaultChecked={blogPost.quotesAsNotes === "true"}
          onChange={(e) => handleChange("quotesAsNotes", e.target.value ? "true" : "false")}
        />
        <label htmlFor="quotes-as-notes">
          Quotes as notes
        </label>
      </span>
      <span className="form-field">
        <label htmlFor="blog-post-tags">
          Tags
        </label>
        <input
          type="text"
          defaultValue={blogPost.tags.join(" ")}
          onChange={(e) => handleChange("tags", e.target.value.split(" "))}
        />
      </span>
      <span className="form-field">
        <label htmlFor="blog-post-body">
          Body
        </label>
        <textarea
          defaultValue={atob(blogPost.body)}
          onChange={(e) => handleChange("body", btoa(e.target.value))}
        />
      </span>
    </>
  );
}

function ItemForm({
  itemType, setItemBody
}: {
  itemType: string;
  setItemBody: React.Dispatch<React.SetStateAction<any>>;
}) {
  switch (itemType) {
  case "post":
    return <BlogPostForm setItemBody={setItemBody} />;
  default:
    return (
      <textarea
        placeholder="Body"
        onChange={(e) => {
          let value;
          try {
            value = JSON.stringify(JSON.parse(e.target.value));
            setItemBody(value);
          } catch (err) {
            console.debug(err);
          }
        }}
      />
    );
  }
}

export default function Admin() {
  const [itemType, setItemType] = useState<string>("post");
  const [itemBody, setItemBody] = useState<string>();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      <Head>
        <title>{retitle("Admin")}</title>
        <meta property="og:title" content={retitle("Playlists")} key="title" />
      </Head>
      <NavigationView
        content={(
          <article className="app-page admin-page">
            <h2>Admin</h2>
            <form onSubmit={handleSubmit}>
              <select defaultValue={itemType} placeholder="Select item type" onChange={(e) => setItemType(e.target.value)}>
                <option value="link">Link</option>
                <option value="post">Blog Post</option>
                <option value="project">Project</option>
                <option value="tv_show">TV Show</option>
                <option value="movie">Movie</option>
                <option value="playlist">Playlist</option>
              </select>
              <ItemForm itemType={itemType} setItemBody={setItemBody} />
              <input
                type="submit"
                value="Submit"
                disabled={!itemBody || !Object.keys(JSON.parse(itemBody)).length}
              />
            </form>
          </article>
        )}
      />
    </>
  );
}
