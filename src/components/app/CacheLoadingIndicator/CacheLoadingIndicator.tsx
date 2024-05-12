import React from "react";
import { CacheContextState } from "../../../stores/cache";
import "./CacheLoadingIndicator.css";

export default function LoadingIndicator() {
  const cacheContext = React.useContext(CacheContextState);

  if (!Object.values(cacheContext.isCachePending).every((v) => !!v))
    return <></>;

  return (
    <div className="loading-indicator">
      <span className="loading-indicator-toast"></span>
    </div>
  );
}