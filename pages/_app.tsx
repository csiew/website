import React from "react";
import Head from "next/head";
import "./app.css";
import BackToHome from "../components/app/BackToHome";
import BackToTop from "../components/app/BackToTop";
import config from "../config";

const AppContainer = ({ Component, pageProps }: any) => {
  return (
    <>
      <Head>
        {
          config.debugMode
            ? <script>self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;</script>
            : <></>
        }
        <link rel="shortcut icon" href="/profile.jpg" />
        <title>Clarence Siew</title>
      </Head>
      <BackToHome />
      <main>
        <Component {...pageProps} />
        <BackToTop />
        <div className="randomAnimationBar"></div>
      </main>
    </>
  );
};

export default AppContainer;
