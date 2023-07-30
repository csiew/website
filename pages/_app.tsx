import React, { useEffect } from "react";
import Head from "next/head";
import NavBar from "../components/app/NavBar";
import BackToTop from "../components/app/BackToTop";
import Footer from "../components/app/Footer";
import config from "../config";
import "./app.css";

const AppContainer = ({ Component, pageProps }: any) => {
  useEffect(() => {
    const rootClassList = document.getElementById(config.rootElementId)?.classList;
    config.features.classicScrollbar
      ? rootClassList?.add("classic-scrollbar")
      : rootClassList?.remove("classic-scrollbar");
  }, []);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/cartoon-profile.jpg" />
        <title>Clarence Siew</title>
      </Head>
      <NavBar />
      <main>
        <Component {...pageProps} />
        <BackToTop />
        <Footer />
      </main>
    </>
  );
};

export default AppContainer;
