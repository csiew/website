import React from "react";
import Markdown from "react-markdown";
import { Helmet } from "react-helmet-async";
import "./Home.css";
import homeMd from "./Home.md";

export default function Home() {
  const [content, setContent] = React.useState<string>("");

  React.useEffect(() => {
    fetch(homeMd)
      .then((md) => md.text())
      .then((c) => setContent(c));
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | Clarence Siew</title>
      </Helmet>
      <div className="home">
        <Markdown>{content}</Markdown>
      </div>
    </>
  );
}
