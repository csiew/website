import React, { useEffect } from "react";
import Head from "next/head";
import config from "../config";
import retitle from "../lib/retitle";
import NavigationView from "../components/ui/NavigationView";
import ContactForm from "../components/app/ContactForm";

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
          <article className="topLevelPage pageHome">
            <section>
              <h3>Hi there</h3>
              <p>
                <img className="profile" src="/profile.jpg" alt="Clarence's portrait" />
                <span>
                  I&apos;m a full-stack software engineer based in Melbourne. I love reading about history, listening to rock music, and the occassional writing of lore for fictional game worlds.
                </span>
              </p>
            </section>
            <section>
              <h3>Tech Stack</h3>
              <p>
                I mostly develop in TypeScript and JavaScript for both backend services and frontend/websites. Count HTML in for the latter. I have experience developing in Java and Kotlin for backend services. I also use Shell and Python scripts from time to time for some DevOps or quick data processing.
              </p>
              <p>
                I also actively use Amazon Web Services at work. For personal projects I largely use Netlify for CI/CD and hosting, with some experimenting with edge functions; Google Firebase for its cloud database and cloud functions.
              </p>
            </section>
            {
              config.features.contactForm
                ? (
                  <section>
                    <ContactForm />
                  </section>
                )
                : <></>
            }
          </article>
        )}
      />
    </>
  );
};

export default Home;
