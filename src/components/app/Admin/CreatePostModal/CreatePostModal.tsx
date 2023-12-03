import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { AdminAuthContext } from "../../../../stores/auth";
import config from "../../../../config";
import Alert from "../../../ui/Alert";
import Paper from "../../../ui/Paper";
import Modal from "../../../ui/Modal";
import BlogPostForm from "../Form/BlogPostForm";
import WatchingForm from "../Form/WatchingForm";
import LinkPostForm from "../Form/LinkPostForm";
import ProjectForm from "../Form/ProjectForm";

function ItemForm({
  itemType, setItemBody
}: {
  itemType: string;
  setItemBody: React.Dispatch<React.SetStateAction<any>>;
}) {
  switch (itemType) {
  case "link":
  case "playlist":
    return <LinkPostForm setItemBody={setItemBody} />;
  case "post":
    return <BlogPostForm setItemBody={setItemBody} />;
  case "project":
    return <ProjectForm setItemBody={setItemBody} />;
  case "tv_show":
    return <WatchingForm variant="tv_show" setItemBody={setItemBody} />;
  case "movie":
    return <WatchingForm variant="movie" setItemBody={setItemBody} />;
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

export default function CreatePostModal({ closeWindowCallback }: { closeWindowCallback: () => void }) {
  const router = useRouter();
  const adminAuthContext = useContext(AdminAuthContext);
  const isMountedRef = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [itemType, setItemType] = useState<string>("post");
  const [itemBody, setItemBody] = useState<string>();

  function parseItemBody() {
    if (!itemBody || !Object.entries(itemBody).length) {
      return {};
    }
    const parsedBody = JSON.parse(itemBody);
    Object.entries(parsedBody).forEach(([k, v]) => {
      if (typeof v === "string" && ["true", "false"].includes(v)) {
        parsedBody[k] = (v === "true");
      }
    });
    return parsedBody;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    const supabase = createClient(`https://${config.supabase.host}`, config.supabase.apiKey as string);
    const { error } = await supabase
      .from("item")
      .insert({
        id: uuidv4().toString(),
        content_type: itemType,
        body: parseItemBody()
      });
    setIsError(!!error);
    setIsSuccess(!error);
    setIsLoading(false);
  }

  function redirectIfNotAuthenticated() {
    console.debug("[auth] Checking if authenticated");
    if (!adminAuthContext.session.token?.length) {
      console.debug("[auth] Redirecting to admin login page");
      router.push("/admin/login");
    }
  }

  useEffect(() => {
    if (!isMountedRef.current) {
      setIsLoading(true);
      redirectIfNotAuthenticated();
      isMountedRef.current = true;
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    redirectIfNotAuthenticated();
  }, [adminAuthContext.session]);

  return (
    <Modal
      className="admin-create-post-modal"
      closeWindowCallback={closeWindowCallback}
    >
      {isLoading && <Alert>Loading...</Alert>}
      {isError && <Alert variant="error">Failed to submit post</Alert>}
      {isSuccess && <Alert variant="success">Successfully submitted post</Alert>}
      <form onSubmit={handleSubmit}>
        <select defaultValue={itemType} placeholder="Select item type" onChange={(e) => setItemType(e.target.value)}>
          <option value="link">Link</option>
          <option value="post">Blog Post</option>
          <option value="project">Project</option>
          <option value="tv_show">TV Show</option>
          <option value="movie">Movie</option>
          <option value="playlist">Playlist</option>
        </select>
        <Paper style={{ width: "100%", paddingBlock: "1.5rem 2rem", gap: "1rem" }}>
          <ItemForm itemType={itemType} setItemBody={setItemBody} />
        </Paper>
        <input
          type="submit"
          value="Submit"
          disabled={!itemBody || !Object.keys(JSON.parse(itemBody)).length}
        />
      </form>
    </Modal>
  );
}
