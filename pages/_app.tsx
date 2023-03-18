import React from "react";
import Head from "next/head";
import "./app.css";
import NavBar from "../components/app/NavBar";
import BackToTop from "../components/app/BackToTop";
import Footer from "../components/app/Footer";

const AppContainer = ({ Component, pageProps }: any) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/profile.jpg" />
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
