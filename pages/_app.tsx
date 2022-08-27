import React from "react";
import Head from "next/head";
import "./app.css";
import NavBar from "../components/app/NavBar";
import Footer from "../components/app/Footer";
import routes from "../lib/routes";

const AppContext = ({ Component, pageProps }: any) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/profile.jpg" />
      </Head>
      <NavBar pages={routes} />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
};

export default AppContext;