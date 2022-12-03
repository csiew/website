import React from "react";
import Head from "next/head";
import "./app.css";
import Navbar from "../components/app/Navbar";
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
      <div className="randomAnimationBar"></div>
      <Navbar />
      <main>
        <Component {...pageProps} />
        <BackToTop />
      </main>
    </>
  );
};

export default AppContainer;
