import React, { useContext, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import retitle from "../../lib/retitle";
import NavigationView from "../../components/ui/NavigationView";
import { AdminAuthContext } from "../../stores/auth";
import CreatePostModal from "../../components/app/Admin/CreatePostModal/CreatePostModal";

export default function Admin() {
  const router = useRouter();
  const adminAuthContext = useContext(AdminAuthContext);
  const isMountedRef = useRef<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  function redirectIfNotAuthenticated() {
    console.debug("[auth] Checking if authenticated");
    if (!adminAuthContext.session.token?.length) {
      console.debug("[auth] Redirecting to admin login page");
      router.push("/admin/login");
    }
  }

  function redirectToLogout() {
    console.debug("[auth] Redirecting to admin logout");
    router.push("/admin/logout");
  }

  useEffect(() => {
    if (!isMountedRef.current) {
      setIsLoading(true);
      redirectIfNotAuthenticated();
      isMountedRef.current = true;
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    redirectIfNotAuthenticated();
  }, [adminAuthContext.session]);

  return (
    <>
      <Head>
        <title>{retitle("Admin")}</title>
        <meta property="og:title" content={retitle("Admin")} key="title" />
      </Head>
      {showCreateModal && <CreatePostModal closeWindowCallback={() => setShowCreateModal(false)} />}
      <NavigationView
        content={(
          <article className="app-page admin-page">
            <h2>Admin</h2>
            <button title="Create post" onClick={() => setShowCreateModal(true)}>
              Create post
            </button>
            <button title="Logout" onClick={() => redirectToLogout()}>
              Logout
            </button>
          </article>
        )}
      />
    </>
  );
}
