import React from "react";
import { Helmet } from "react-helmet-async";
import "./Home.css";
import homeMd from "./Home.md";
import RenderMd from "../../components/util/RenderMd/RenderMd";
import LinkGrid from "../../components/app/LinkGrid/LinkGrid";

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
        <meta name="title" property="og:title" content="Home | Clarence Siew" />
        <meta name="url" property="og:url" content="https://www.clarencesiew.com/" />
        <meta name="site_name" property="og:site_name" content="Clarence Siew" />
        <meta name="description" property="og:description" content="Software Engineer based in Melbourne" />
        <meta name="author" property="og:author" content="Clarence Siew" />
        <meta name="locale" property="og:locale" content="en_GB" />
      </Helmet>
      <div className="home">
        <div className="home-intro">
          <RenderMd>{content}</RenderMd>
        </div>
        <LinkGrid />
      </div>
    </>
  );
}
