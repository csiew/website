import React, { useState } from "react";

type BlogPostFormState = {
  title: string;
  subtitle: string;
  quotesAsNotes: "true" | "false";
  tags: string[];
  body: string;
};

export default function BlogPostForm({
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

  function handleAddTag(e: React.KeyboardEvent) {
    (e.target as any).value = ((e.target as any).value).replaceAll(" ", "");
    if (e.key === "Enter") {
      e.preventDefault();
      const tag = (e.target as any).value;
      if (!!tag.length && !blogPost.tags.includes(tag)) {
        const updatedBlogPost = {
          ...blogPost,
          tags: [...blogPost.tags, tag]
        };
        setBlogPost(updatedBlogPost);
        setItemBody(JSON.stringify(updatedBlogPost));
      }
      (e.target as any).value = "";
    }
  }

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
      <span className="form-field">
        <label htmlFor="blog-post-body">
          Body
        </label>
        <textarea
          defaultValue={atob(blogPost.body)}
          onChange={(e) => handleChange("body", btoa(e.target.value))}
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
          onKeyDown={handleAddTag}
        />
        {!!blogPost.tags.length && (
          <ul>
            {blogPost.tags.map((tag) => (
              <li key="tag">
                {tag} (<a href="#" onClick={() => setBlogPost({ ...blogPost, tags: blogPost.tags.filter((t) => t !== tag) })}>Delete</a>)
              </li>
            ))}
          </ul>
        )}
      </span>
    </>
  );
}
