import React, { useState } from "react";

type LinkPostFormState = {
  url: string;
  title: string;
  description?: string;
};

export default function LinkPostForm({
  setItemBody
}: {
  setItemBody: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [linkPost, setLinkPost] = useState<LinkPostFormState>({
    url: "",
    title: "",
    description: ""
  });

  function handleChange(field: string, content: string | string[] | boolean, optional?: boolean) {
    const updatedLinkPost = { ...linkPost } as any;
    updatedLinkPost[field] = content;
    if (optional && !(content as string).length)
      delete updatedLinkPost[field];
    setLinkPost(updatedLinkPost);
    setItemBody(JSON.stringify(updatedLinkPost));
  }

  return (
    <>
      <span className="form-field">
        <label htmlFor="link-post-title">
          Title
        </label>
        <input
          type="text"
          name="link-post-title"
          defaultValue={linkPost.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </span>
      <span className="form-field">
        <label htmlFor="link-post-url">
          URL
        </label>
        <span style={{
          width: "100%",
          display: "inline-flex",
          flexFlow: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "0.5rem"
        }}>
          <input
            type="url"
            name="link-post-url"
            defaultValue={linkPost.url}
            onChange={(e) => handleChange("url", e.target.value)}
          />
        </span>
      </span>
      <span className="form-field">
        <label htmlFor="link-post-description">
          Description
        </label>
        <textarea
          name="link-post-description"
          defaultValue={linkPost.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </span>
    </>
  );
}
