import React, { useEffect, useState } from "react";
import Head from "next/head";
import NavBar from "../components/app/NavBar/NavBar";
import BackToTop from "../components/app/BackToTop";
import Footer from "../components/app/Footer";
import AppContext from "../stores";
import config from "../config";
import "./app.css";

export default function AppContainer({ Component, pageProps }: any) {
  const [scrolled, setScrolled] = useState<boolean>(false);

  function handleScroll(this: HTMLElement, ev: Event) {
    setScrolled((ev.target as any).scrollTop > 0);
  }

  useEffect(() => {
    const rootElement = document.getElementById(config.rootElementId);
    const rootClassList = rootElement?.classList;
    config.features.classicScrollbar
      ? rootClassList?.add("classic-scrollbar")
      : rootClassList?.remove("classic-scrollbar");
    rootElement?.addEventListener("scroll", handleScroll);
    return () => rootElement?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/profile.jpg" />
        <title>Clarence Siew</title>
      </Head>
      <AppContext>
        <main>
          <Component {...pageProps} />
          <BackToTop />
          <Footer />
        </main>
      </AppContext>
    </>
  );
}
