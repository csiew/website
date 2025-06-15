import React from "react";
import { Link } from "wouter";
import "./NotFound.css";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not Found | Clarence Siew</title>
        <meta name="title" property="og:title" content="Not Found | Clarence Siew" />
        <meta name="url" property="og:url" content="https://www.clarencesiew.com/" />
        <meta name="site_name" property="og:site_name" content="Clarence Siew" />
        <meta name="description" property="og:description" content="Page not found" />
        <meta name="author" property="og:author" content="Clarence Siew" />
        <meta name="locale" property="og:locale" content="en_GB" />
      </Helmet>
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
