import React, { useEffect, useState } from "react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import config from "../config";
import retitle from "../lib/retitle";
import NavigationView from "../components/ui/NavigationView";
import { useInterval } from "usehooks-ts";
import IntroCard from "../sections/About/About";

const greetings = [
  "Howdy!",
  "Howdy stranger!",
  "Hi there, stranger.",
  "Hi there, visitor.",
  "Greetings.",
  "Aloha!",
  "Hola!",
  "Welcome!",
  "Oh hey, didn't see you there!"
];

const content = `
I'm a full-stack software engineer based in Melbourne. Coding isn't just a job for me, it's been a passion of mine since I was 9 years old and it's been my primary hobby ever since.

I also love reading about history (ancient civilisations, culinary history, architecture and urban planning, etc) and scouring Spotify &amp; YouTube for new music.

I mostly develop in TypeScript and JavaScript for both backend services and frontend/websites. I've used a plethora frontend frameworks/libraries such as React (including Next.js), Vue.js, and Svelte (including SvelteKit) for work and personal projects. I also have experience developing in Java and Kotlin with Spring for backend services. I also use Shell and Python scripts from time to time for some DevOps or quick data processing.

I also actively use Amazon Web Services at work. For personal projects I largely use Netlify for CI/CD and hosting, with some experimenting with edge functions. I've also experimented with Google Firebase, Supabase, and PlanetScale for personal projects for both SQL and NoSQL database hosting.
`;

export default function Home({ lastUpdated }: { lastUpdated: number }) {
  const [greetingIndex, setGreetingIndex] = useState<number>();

  useEffect(() => {
    setGreetingIndex(Math.floor(Math.random() * greetings.length));
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);

  useInterval(() => {
    setGreetingIndex(Math.floor(Math.random() * greetings.length));
  }, 1000);

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
            <IntroCard />
            <p className="greeting">
              {greetingIndex ? greetings[greetingIndex] : "Hello."}
            </p>
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

export const getStaticProps = async () => {
  const lastUpdated = Date.now();
  return {
    props: { lastUpdated },
  };
};
