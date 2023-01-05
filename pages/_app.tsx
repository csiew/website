import React, { useEffect, useState } from "react";
import Head from "next/head";
import "./app.css";
import NavBar from "../components/app/NavBar";
import BackToTop from "../components/app/BackToTop";
import Footer from "../components/app/Footer";
import useSession from "../firebase/session";

const AppContainer = ({ Component, pageProps }: any) => {
  const session = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(session.isLoggedIn());
  }, [session.user]);
  
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/profile.jpg" />
        <title>Clarence Siew</title>
      </Head>
      <NavBar />
      <main>
        <Component {...pageProps} isLoggedIn={isLoggedIn} />
        <BackToTop />
      </main>
      <Footer />
    </>
  );
};

export default AppContainer;
