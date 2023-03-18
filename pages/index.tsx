import React, { useEffect } from "react";
import Head from "next/head";
import config from "../config";
import retitle from "../lib/retitle";
import NavigationView from "../components/ui/NavigationView";

const Home = () => {
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
            <section>
              <p>Hi, I&apos;m <b>Clarence Siew</b>.</p>
              <p>
                I&apos;m a full-stack software engineer based in Melbourne. I love reading about history, listening to rock music (I curate annual zeitgeist <a href="/playlists">playlists</a>), <a href="/now-watching">watching TV shows</a>, and the occassional writing of lore for fictional game worlds.
              </p>
              <p>
                Coding isn&apos;t just a job for me, it&apos;s been a passion of mine since I was 9 years old. Check out a selection of my <a href="/projects">personal projects</a>.
              </p>
              <p>
                I mostly develop in TypeScript and JavaScript for both backend services and frontend/websites. I&apos;ve used a plethora frontend frameworks/libraries such as React, Next.js, Vue.js, Svelte/SvelteKit, and Mithril.js for work and personal projects.
              </p>
              <p>
                I have experience developing in Java and Kotlin for backend services. I also use Shell and Python scripts from time to time for some DevOps or quick data processing.
              </p>
              <p>
                I also actively use Amazon Web Services at work. For personal projects I largely use Netlify for CI/CD and hosting, with some experimenting with edge functions; Google Firebase for its cloud database and cloud functions.
              </p>
              <p>
                You can find me on <a href="https://github.com/csiew" target="_blank" rel="noreferrer">GitHub</a> and <a href="https://www.linkedin.com/in/clarencesiew/" target="_blank" rel="noreferrer">LinkedIn</a>. You can also find me on <a href="https://mastodon.online/@csiew" target="_blank" rel="noreferrer">Mastodon</a>, though I don&apos;t usually post there.
              </p>
              <p>
                You could also email me at <span className="no-select" style={{ fontWeight: "bold" }}>clarence.siew@gmail.com</span>.
              </p>
            </section>
          </article>
        )}
      />
    </>
  );
};

export default Home;
