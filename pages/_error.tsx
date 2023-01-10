import React from "react";
import NavigationView from "../components/ui/NavigationView";

const ErrorContainer = () => {
  return (
    <NavigationView
      content={
        <article className="app-page">
          <h2>404 Not Found</h2>
          <div style={{ width: "100%", display: "inline-flex", flexFlow: "row", alignItems: "center", justifyContent: "center" }}>
            <iframe width="480px" height="360px" src="https://www.youtube-nocookie.com/embed/lDYfQhoOvZc?controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" style={{ borderRadius: "9px" }}></iframe>
          </div>
        </article>
      }
    />
  );
};

export default ErrorContainer;
