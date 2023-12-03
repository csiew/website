import React, { useContext, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { createClient, User, Session } from "@supabase/supabase-js";
import NavigationView from "../../../components/ui/NavigationView";
import retitle from "../../../lib/retitle";
import config from "../../../config";
import Alert from "../../../components/ui/Alert";
import { AdminAuthContext } from "../../../stores/auth";

export default function AdminLogin() {
  const router = useRouter();
  const adminAuthContext = useContext(AdminAuthContext);
  const isMountedRef = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  function extractAccessProps(response: { user: User, session: Session }) {
    // Save access token + expiry to session storage
    const token = response.session?.access_token;
    const expiresAt = response.session?.expires_at;
    return { token, expiresAt };
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true);
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const supabase = createClient(`https://${config.supabase.host}`, config.supabase.apiKey as string);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error(error);
      setIsError(true);
    } else {
      console.log(data);
      setIsError(false);
      const { token, expiresAt } = extractAccessProps(data);
      window.sessionStorage.setItem("token", token);
      window.sessionStorage.setItem("expires_at", String(Date.now() + (expiresAt ?? 0)));
      if (adminAuthContext.setSession) {
        adminAuthContext.setSession({ token, expiresAt });
        redirectIfAuthenticated();
      }
    }
    setIsLoading(false);
  }

  function redirectIfAuthenticated() {
    console.debug("[auth] Checking if authenticated");
    const token = window.sessionStorage.getItem("token");
    const expiresAt = Number(window.sessionStorage.getItem("expires_at") ?? -1);
    console.debug({ token, expiry: new Date(expiresAt) });
    if (adminAuthContext.setSession && !!token?.length && Date.now() < expiresAt) {
      adminAuthContext.setSession({ token, expiresAt });
      console.debug("[auth] Redirecting to admin main page");
      router.push("/admin");
    }
  }

  useEffect(() => {
    if (!isMountedRef.current) {
      redirectIfAuthenticated();
      isMountedRef.current = true;
    }
  }, []);

  return (
    <>
      <Head>
        <title>{retitle("Admin Login")}</title>
        <meta property="og:title" content={retitle("Admin Login")} key="title" />
      </Head>
      <NavigationView
        content={
          <article className="app-page login-page">
            <h2>Login</h2>
            {isError && <Alert variant="error" style={{ marginBottom: "1rem" }}>Failed to login</Alert>}
            <form onSubmit={handleSubmit}>
              <span className="form-field">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" autoComplete="true" disabled={isLoading} />
              </span>
              <span className="form-field">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" autoComplete="true" disabled={isLoading} />
              </span>
              <input type="submit" value="Login" disabled={isLoading} />
            </form>
          </article>
        }
      />
    </>
  );
}
