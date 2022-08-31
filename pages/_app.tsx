import React, {  } from "react";
import Head from "next/head";
import "./app.css";
import routes from "../lib/routes";
import NavBar from "../components/app/NavBar";
import Footer from "../components/app/Footer";
import BackToTop from "../components/app/BackToTop";

const AppContext = ({ Component, pageProps }: any) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/profile.jpg" />
        <title>Clarence Siew</title>
      </Head>
      <NavBar pages={routes} />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default AppContext;
