import React, { useEffect } from "react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import config from "../config";
import retitle from "../lib/retitle";
import NavigationView from "../components/ui/NavigationView";

const content = `
I'm a full-stack software engineer based in Melbourne. I love reading about history, listening to rock music (I curate annual zeitgeist [playlists](/playlists)) and the occassional writing of lore for fictional game worlds.

Coding isn't just a job for me, it's been a passion of mine since I was 9 years old. Check out a selection of my [personal projects](/projects).

I mostly develop in TypeScript and JavaScript for both backend services and frontend/websites. I've used a plethora frontend frameworks/libraries such as React, Next.js, Vue.js, Svelte/SvelteKit, and Mithril.js for work and personal projects.

I have experience developing in Java and Kotlin for backend services. I also use Shell and Python scripts from time to time for some DevOps or quick data processing.

I also actively use Amazon Web Services at work. For personal projects I largely use Netlify for CI/CD and hosting, with some experimenting with edge functions; Google Firebase for its cloud database and cloud functions.
`;

export default function Home({ lastUpdated }: { lastUpdated: number }) {
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
  const lastUpdated = Date.now();
  return {
    props: { lastUpdated },
  };
};
