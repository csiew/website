import React from "react";
import Head from "next/head";
import "./app.css";
import NavBar from "../components/app/NavBar";
import BackToTop from "../components/app/BackToTop";
import config from "../config";
import Footer from "../components/app/Footer";

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
      <NavBar />
      <main>
        <Component {...pageProps} />
        <BackToTop />
      </main>
      <Footer />
    </>
  );
};

export default AppContainer;
