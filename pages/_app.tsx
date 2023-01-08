import React, { useEffect, useState } from "react";
import Head from "next/head";
import "./app.css";
import NavBar from "../components/app/NavBar";
import BackToTop from "../components/app/BackToTop";
import Footer from "../components/app/Footer";
import useSession from "../firebase/session";
import { BlogPost } from "../lib/blog";
import ContentContext from "../stores/posts";

const AppContainer = ({ Component, pageProps }: any) => {
  const session = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(session.isLoggedIn());
  }, [session.user]);
  
  return (
    <ContentContext.Provider value={{ posts: new Array<BlogPost>() }}>
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
    </ContentContext.Provider>
  );
};

export default AppContainer;
