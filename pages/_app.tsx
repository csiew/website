import React, {  } from "react";
import Head from "next/head";
import "./app.css";
import routes from "../lib/routes";
import NavBar from "../components/app/NavBar";
import Footer from "../components/app/Footer";
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
      <NavBar pages={routes} />
      <main>
        <Component {...pageProps} />
        <Footer />
        <BackToTop />
      </main>
    </>
  );
};

export default AppContainer;
