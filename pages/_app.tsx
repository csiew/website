import React, { useEffect, useState } from "react";
import Head from "next/head";
import "./app.css";
import NavBar from "../components/app/NavBar";
import BackToTop from "../components/app/BackToTop";
import Footer from "../components/app/Footer";
import config from "../config";
import Modal from "../components/ui/Modal";
import SearchPage from "./search";

const AppContainer = ({ Component, pageProps }: any) => {
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);

  useEffect(() => {
    const rootClassList = document.getElementById(config.rootElementId)?.classList;
    config.features.classicScrollbar
      ? rootClassList?.add("classic-scrollbar")
      : rootClassList?.remove("classic-scrollbar");
  }, []);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/profile.jpg" />
        <title>Clarence Siew</title>
      </Head>
      <NavBar setShowSearchModal={setShowSearchModal} />
      <main>
        {
          showSearchModal && (
            <Modal closeWindowCallback={() => setShowSearchModal(false)}>
              <SearchPage setShowSearchModal={setShowSearchModal} />
            </Modal>
          )
        }
        <Component {...pageProps} />
        <BackToTop />
        <Footer />
      </main>
    </>
  );
};

export default AppContainer;
