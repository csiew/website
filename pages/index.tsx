import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import config from "../config";
import retitle from "../lib/retitle";
import NavigationView from "../components/ui/NavigationView";
import Paper from "../components/ui/Paper";
import generateRssFeed from "../utils/generate-rss-feed";

const Home = ({ content }: { content: string }) => {
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
            <p>
              Hi, I&apos;m <span style={{ fontWeight: 900 }}>Clarence Siew</span>.
            </p>
            {
              Date.now() < (new Date("2023-04-15 00:00:00").getTime())
                ? (
                  <div className="note">
                    <h3>What&apos;s new</h3>
                    <p>
                      New post: <Link href="/posts/different-crowds">Different crowds</Link>, new pages: <Link href="/now">/now</Link>, <Link href="/feed">/feed</Link>, RSS feed generated on build
                    </p>
                  </div>
                )
                : <></>
            }
            <ReactMarkdown linkTarget="_blank">
              {content}
            </ReactMarkdown>
            <p>
              You could also email me at <span className="no-select" style={{ fontWeight: "bold" }}>clarence.siew@gmail.com</span>.
            </p>
          </article>
        )}
      />
    </>
  );
};

export const getStaticProps = async (context: any) => {
  await generateRssFeed();

  const content = fs.readFileSync(path.join(process.cwd(), "content", "home.md"), { encoding: "utf8" });
  return {
    props: { content },
  };
};

export default Home;
