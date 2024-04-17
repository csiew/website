import React from "react";
import Markdown from "react-markdown";
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
      <Markdown children={content} />
    </>
  );
}
