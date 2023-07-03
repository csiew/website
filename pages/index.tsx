import React, { useEffect } from "react";
import Head from "next/head";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import config from "../config";
import retitle from "../lib/retitle";
import NavigationView from "../components/ui/NavigationView";

export default function Home({ content, lastUpdated }: { content: string, lastUpdated: number }) {
  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Head>
        <title>{retitle("Home")}</title>
        <meta property="og:title" content={retitle("Home")} key="title" />
      </Head>
      <NavigationView
        content={(
          <article className="app-page home-page">
            <h2>Clarence Siew</h2>
            <ReactMarkdown>
              {content}
            </ReactMarkdown>
            <p>
              <span style={{ color: "var(--fg-color-6)", fontStyle: "italic", fontSize: "0.8rem" }}>
                Last updated: {(new Date(lastUpdated)).toDateString()}
              </span>
            </p>
          </article>
        )}
      />
    </>
  );
}

export const getStaticProps = async (context: any) => {
  const content = fs.readFileSync(path.join(process.cwd(), "content", "home.md"), { encoding: "utf8" });
  const lastUpdated = Date.now();
  return {
    props: { content, lastUpdated },
  };
};
