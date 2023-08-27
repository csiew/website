import React, { useState } from "react";
import { OmdbResponse } from "../../../../lib/watching";
import { getShowDataById } from "../../../../client/omdb";
import config from "../../../../config";
import Alert from "../../../ui/Alert";

type WatchingFormState = {
  imdbId: string;
  name: string;
  watching: "true" | "false";
  recommended: "true" | "false";
  details?: Partial<OmdbResponse>;
};

export default function WatchingForm({
  variant, setItemBody
}: {
  variant: "tv_show" | "movie";
  setItemBody: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [watchingPost, setWatchingPost] = useState<WatchingFormState>({
    imdbId: "",
    name: "",
    watching: "false",
    recommended: "false"
  });
  const [omdbClientResult, setOmdbClientResult] = useState<Partial<OmdbResponse>>({});

  function handleReset(ev: any) {
    ev.preventDefault();
    setWatchingPost({
      imdbId: "",
      name: "",
      watching: "false",
      recommended: "false"
    });
    setOmdbClientResult({});
    setIsLoading(false);
    setIsError(false);
  }

  function handleChange(field: string, content: string | string[] | boolean) {
    const updatedWatchingPost = { ...watchingPost } as any;
    updatedWatchingPost[field] = content;
    setWatchingPost(updatedWatchingPost);
    setItemBody(JSON.stringify(updatedWatchingPost));
  }

  async function handleGetOmdbSubmit(ev: any) {
    ev.preventDefault();
    setIsLoading(true);
    const imdbId = watchingPost.imdbId;
    let result: Partial<OmdbResponse> = {};
    try {
      result = await getShowDataById(imdbId);
      const updatedWatchingPost = {
        ...watchingPost,
        name: result.Title ?? "",
        details: result
      };
      setWatchingPost(updatedWatchingPost);
      setItemBody(JSON.stringify(updatedWatchingPost));
      setIsError(false);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
    setOmdbClientResult(result);
    setIsLoading(false);
  }

  return (
    <>
      <span className="form-field">
        <label htmlFor="watching-post-imdb-id">
          IMDB ID
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
            type="text"
            name="watching-post-imdb-id"
            defaultValue={watchingPost.imdbId}
            onChange={(e) => handleChange("imdbId", e.target.value)}
          />
          <button onClick={handleGetOmdbSubmit} disabled={!watchingPost.imdbId.length || isLoading}>
            Fetch
          </button>
          <input type="reset" value="Reset" onClick={handleReset} />
        </span>
      </span>
      <span className="form-field">
        <label htmlFor="watching-post-name">
          Name
        </label>
        <input
          type="text"
          name="watching-post-name"
          value={watchingPost.name}
          placeholder="Fetch IMDB data to retrieve name"
          disabled={true}
        />
      </span>
      <span className="form-field">
        <label htmlFor="watching-post-details">
          Details
        </label>
        {isLoading && <Alert>Loading...</Alert>}
        {isError && <Alert variant="error">Failed to fetch IMDB data</Alert>}
        <pre
          className={config.features.classicScrollbar ? "classic-scrollbar" : undefined}
          style={{ width: "100%", overflow: "auto", padding: "1rem" }}
        >
          {JSON.stringify(omdbClientResult, null, 2)}
        </pre>
      </span>
      <span className="form-field form-field-checkbox">
        <input
          type="checkbox"
          name="watching-post-is-watching"
          defaultChecked={watchingPost.watching === "true"}
          onChange={(e) => handleChange("watching", e.target.value ? "true" : "false")}
        />
        <label htmlFor="watching-post-is-watching">
          {variant === "tv_show" ? "Currently watching" : "Recently watched"}
        </label>
      </span>
      <span className="form-field form-field-checkbox">
        <input
          type="checkbox"
          name="watching-post-is-recommended"
          defaultChecked={watchingPost.recommended === "true"}
          onChange={(e) => handleChange("recommended", e.target.value ? "true" : "false")}
        />
        <label htmlFor="watching-post-is-recommended">
          Recommended watching
        </label>
      </span>
    </>
  );
}
