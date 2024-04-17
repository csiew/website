import React from "react";
import { CacheContextState } from "../../../stores/cache";
import "./LoadingIndicator.css";

export default function LoadingIndicator() {
  const cacheContext = React.useContext(CacheContextState);

  if (!cacheContext.isLoading)
    return <></>;

  return (
    <div className="loading-indicator">
      <span className="loading-indicator-spinner-1"></span>
      <span className="loading-indicator-spinner-2"></span>
    </div>
  );
}