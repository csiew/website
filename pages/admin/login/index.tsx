import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Alert from "../../../components/ui/Alert";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import Button from "../../../components/ui/Button";
import ButtonGroup from "../../../components/ui/ButtonGroup";
import Form from "../../../components/ui/Form";
import FormQuestion from "../../../components/ui/Form/FormQuestion";
import NavigationView from "../../../components/ui/NavigationView";
import config from "../../../config";
import handleLogin from "../../../firebase/login";
import useSession from "../../../firebase/session";
import retitle from "../../../lib/retitle";

const Login = () => {
  const router = useRouter();
  const session = useSession();

  const loginEmailRef = useRef<any>(null);
  const loginPasswordRef = useRef<any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [readyToSubmit, setReadyToSubmit] = useState<boolean>(false);

  const updateReadyToSubmit = () => {
    setReadyToSubmit(
      loginEmailRef.current.value.length > 0 &&
      loginPasswordRef.current.value.length > 0
    );
  };

  const handleSubmission = async () => {
    setIsLoading(true);
    try {
      await handleLogin({
        email: loginEmailRef.current.value,
        password: loginPasswordRef.current.value
      });
      setIsSuccess(true);
      router.push("/admin");
    } catch (err) {
      if (config.debugMode) console.error(err);
      setIsSuccess(false);
    } finally {
      setHasSubmitted(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session.isLoggedIn()) {
      router.push("/admin");
    }
  }, [session.user]);

  return (
    <>
      <Head>
        <title>{retitle("Login")}</title>
        <meta property="og:title" content={retitle("Login")} key="title" />
      </Head>
      <Breadcrumbs
        items={[
          {
            title: "Admin",
            href: "/admin"
          },
          {
            title: "Login"
          }
        ]} />
      <NavigationView
        content={(
          <article className="appPage">
            <h2>Login</h2>
            {
              isLoading
                ? (
                  <Alert variant="plain" style={{ marginBottom: "1rem" }}>
                    Submitting...
                  </Alert>
                )
                : <></>
            }
            {
              hasSubmitted && !isLoading && isSuccess
                ? (
                  <Alert variant="success" style={{ marginBottom: "1rem" }}>
                    Successfully logged in!
                  </Alert>
                )
                : <></>
            }
            {
              hasSubmitted && !isLoading && !isSuccess
                ? (
                  <Alert variant="error" style={{ marginBottom: "1rem" }}>
                    Failed to login!
                  </Alert>
                )
                : <></>
            }
            {
              !isLoading
                ? (
                  <Form onSubmit={handleSubmission}>
                    <FormQuestion
                      variant="email"
                      label="Email"
                      forwardedRef={loginEmailRef}
                      onChange={updateReadyToSubmit}
                      required />
                    <FormQuestion
                      variant="password"
                      label="Password"
                      forwardedRef={loginPasswordRef}
                      onChange={updateReadyToSubmit}
                      required />
                    <ButtonGroup orientation="horizontal" style={{ justifyContent: "flex-end" }}>
                      <Button
                        variant="submit"
                        disabled={!readyToSubmit}>
                        Login
                      </Button>
                    </ButtonGroup>
                  </Form>
                )
                : <></>
            }
          </article>
        )} />
    </>
  );
};

export default Login;
