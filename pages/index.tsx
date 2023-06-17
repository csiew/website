import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import config from "../config";
import retitle from "../lib/retitle";
import NavigationView from "../components/ui/NavigationView";
import Button from "../components/ui/Button";
import { changelogManifest } from "../manifests/changelog";

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
          <article className="app-page home-page">
            <h2>Clarence Siew</h2>
            <ReactMarkdown>
              {content}
            </ReactMarkdown>
            <p>
              You could also email me at <span className="no-select" style={{ fontWeight: "bold" }}>clarence.siew@gmail.com</span>.
            </p>
            <div className="note">
              <h3>What&apos;s new</h3>
              <section>
                {
                  changelogManifest.has(config.version) && (
                    <p>See the changlog for the latest version of this site: <Link href={`/changelog?v=${config.version}`}>{config.version}</Link></p>
                  )
                }
              </section>
              <section>
                <p style={{ padding: "1rem 0rem" }}>
                  <Button variant="link" url="/changelog">
                      See changelogs for all versions &rarr;
                  </Button>
                </p>
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
