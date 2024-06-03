import React from "react";
import { Link } from "wouter";
import "./NotFound.css";

export default function NotFound() {
  return (
    <>
      <h2>Not Found</h2>
      <img
        src="/not-found.png"
        className="not-found"
        onContextMenu={(e) => e.preventDefault()}
      />
      <Link to="/" className="button not-found-redirect">
        Back to homepage
      </Link>
    </>
  );
}
