import React, { useEffect } from "react";
import fs from "fs";
import path from "path";
import Head from "next/head";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import config from "../../config";
import retitle from "../../lib/retitle";
import NavigationView from "../../components/ui/NavigationView";
import { Changelog, changelogManifest } from "../../manifests/changelog";
import queryHighlight from "../../lib/query-highlight";

const ChangelogPage = ({ logs }: { logs: Changelog[] }) => {
  const router = useRouter();

  const handleScrollToQueryVersion = () => {
    const { v } = router.query;
    if (v?.length) {
      const vEl = document.getElementById(v as string);
      if (vEl) queryHighlight(vEl);
    }
  };

  useEffect(() => {
    handleScrollToQueryVersion();
  }, [router.query]);
  
  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Head>
        <title>{retitle("Changelog")}</title>
        <meta property="og:title" content={retitle("Changelog")} key="title" />
      </Head>
      <NavigationView
        content={
          <article className="app-page">
            <h2>Changelog</h2>
            {
              logs.map((changelog: Changelog) => {
                return (
                  <>
                    <section key={changelog.version} id={changelog.version}>
                      <h3>{changelog.title}</h3>
                      <sub style={{ fontStyle: "italic" }}>{changelog.subtitle}</sub>
                      <ReactMarkdown>
                        {changelog.content!}
                      </ReactMarkdown>
                    </section>
                    <hr />
                  </>
                );
              })
            }
          </article>
        }
      />
    </>
  );
};

export const getStaticProps = async (context: any) => {
  const logs: Changelog[] = [...changelogManifest.entries()]
    .map(([version, changelog]) => {
      const content = fs.readFileSync(path.join(process.cwd(), "content", "changelog", changelog.filePath), { encoding: "utf8" });
      return {
        ...changelog,
        version,
        content
      };
    })
    .reverse();

  return {
    props: { logs },
  };
};

export default ChangelogPage;
