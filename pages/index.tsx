import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import config from "../config";
import retitle from "../lib/retitle";
import NavigationView from "../components/ui/NavigationView";

const Home = ({ content, lastUpdated }: { content: string, lastUpdated: number }) => {
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
          <article className="app-page pageHome">
            <h2>Clarence Siew</h2>
            <ReactMarkdown linkTarget="_blank">
              {content}
            </ReactMarkdown>
            <p>
              You could also email me at <span className="no-select" style={{ fontWeight: "bold" }}>clarence.siew@gmail.com</span>.
            </p>
            <div className="note">
              <h3>What&apos;s new</h3>
              <section>
                <p style={{ fontWeight: "bold", fontStyle: "italic" }}>Version 6.11.1</p>
                <p>
                  <a href="https://github.com/csiew/website/pull/82" target="_blank" rel="noreferrer">
                    See pull request for version 6.11.1
                  </a>
                </p>
                <ul>
                  <li>Fixed invalid article URLs in generated RSS feeds</li>
                </ul>
              </section>
              <hr />
              <section>
                <p style={{ fontWeight: "bold", fontStyle: "italic" }}>Version 6.11.0</p>
                <p>
                  <a href="https://github.com/csiew/website/pull/81" target="_blank" rel="noreferrer">
                    See pull request for version 6.11.0
                  </a>
                </p>
                <ul>
                  <li>Refreshed design</li>
                  <li>New post: <Link href="/posts/different-crowds">Different crowds</Link></li>
                  <li>New pages: <Link href="/now">/now</Link>, <Link href="/feed">/feed</Link></li>
                  <li><a href="/rss.xml" target="_blank">RSS feeds</a> and <a href="/sitemap.xml" target="_blank">Sitemap</a> generated server-side</li>
                  <li>Site-wide search functionality (see the search button on the navbar)</li>
                </ul>
              </section>
              <span style={{ color: "var(--fg-color-6)", fontStyle: "italic", fontSize: "0.8rem" }}>
                Last updated: {(new Date(lastUpdated)).toDateString()}
              </span>
            </div>
          </article>
        )}
      />
    </>
  );
};

export const getStaticProps = async (context: any) => {
  const content = fs.readFileSync(path.join(process.cwd(), "content", "home.md"), { encoding: "utf8" });
  const lastUpdated = Date.now();
  return {
    props: { content, lastUpdated },
  };
};

export default Home;
