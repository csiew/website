import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import retitle from "../../lib/retitle";
import ButtonGroup from "../../components/ui/ButtonGroup";
import NavigationView from "../../components/ui/NavigationView";
import config from "../../config";

const Admin = ({ isLoggedIn }: any) => {
  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Head>
        <title>{retitle("Admin")}</title>
        <meta property="og:title" content={retitle("Admin")} key="title" />
      </Head>
      <NavigationView
        content={(
          <article className="topLevelPage">
            <h2>Admin</h2>
            {
              !isLoggedIn
                ? (
                  <section>
                    <ButtonGroup orientation="vertical" style={{ alignItems: "center", justifyContent: "center" }}>
                      <Link href="/admin/signup">Sign Up</Link>
                      <Link href="/admin/login">Login</Link>
                    </ButtonGroup>
                  </section>
                )
                : (
                  <section>
                    <p>Welcome back!</p>
                    <p>
                      <Link href="/admin/signout">Sign Out</Link>
                    </p>
                  </section>
                )
            }
          </article>
        )} />
    </>
  );
};

export default Admin;
