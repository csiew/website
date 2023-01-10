import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import retitle from "../../lib/retitle";
import ButtonGroup from "../../components/ui/ButtonGroup";
import NavigationView from "../../components/ui/NavigationView";
import config from "../../config";
import useSession from "../../firebase/session";
import { MdBuild, MdLogout, MdPostAdd, MdSettings } from "react-icons/md";
import Paper from "../../components/ui/Paper";

const Admin = ({ isLoggedIn }: any) => {
  const session = useSession();

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
          <article className="appPage">
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
                  <>
                    <section>
                      <Paper style={{ width: "100%" }}>
                        <p>Welcome back, {session.user?.displayName ?? session.user?.uid}!</p>
                      </Paper>
                    </section>
                    <section className="admin-applet-list" style={{ marginTop: "1rem" }}>
                      <Link href="/admin/posts">
                        <MdPostAdd />
                        <span>Posts</span>
                      </Link>
                      <Link href="/admin/projects">
                        <MdBuild />
                        <span>Projects</span>
                      </Link>
                      <Link href="/admin/settings">
                        <MdSettings />
                        <span>Settings</span>
                      </Link>
                      <Link href="/admin/signout">
                        <MdLogout />
                        <span>Sign Out</span>
                      </Link>
                    </section>
                  </>
                )
            }
          </article>
        )} />
    </>
  );
};

export default Admin;
