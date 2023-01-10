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
import useSession from "../../../firebase/session";
import handleSignup from "../../../firebase/signup";
import retitle from "../../../lib/retitle";

const Signup = () => {
  const router = useRouter();
  const session = useSession();

  const signupEmailRef = useRef<any>(null);
  const signupPasswordRef = useRef<any>(null);
  const signupVerifyPasswordRef = useRef<any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [readyToSubmit, setReadyToSubmit] = useState<boolean>(false);

  const updateReadyToSubmit = () => {
    setReadyToSubmit(
      signupEmailRef.current.value.length > 0 &&
      signupPasswordRef.current.value.length > 0 &&
      signupVerifyPasswordRef.current.value.length > 0 &&
      signupPasswordRef.current.value ===  signupVerifyPasswordRef.current.value
    );
  };

  const handleSubmission = async () => {
    setIsLoading(true);
    try {
      await handleSignup({
        email: signupEmailRef.current.value,
        password: signupPasswordRef.current.value
      });
      setIsSuccess(true);
      router.push("/admin/login");
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
        <title>{retitle("Sign Up")}</title>
        <meta property="og:title" content={retitle("Sign Up")} key="title" />
      </Head>
      <Breadcrumbs
        items={[
          {
            title: "Admin",
            href: "/admin"
          },
          {
            title: "Sign Up"
          }
        ]} />
      <NavigationView
        content={(
          <article className="app-page">
            <h2>Sign Up</h2>
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
                    Successfully signed up!
                  </Alert>
                )
                : <></>
            }
            {
              hasSubmitted && !isLoading && !isSuccess
                ? (
                  <Alert variant="error" style={{ marginBottom: "1rem" }}>
                    Failed to sign up!
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
                      forwardedRef={signupEmailRef}
                      onChange={updateReadyToSubmit}
                      required />
                    <FormQuestion
                      variant="password"
                      label="Password"
                      forwardedRef={signupPasswordRef}
                      onChange={updateReadyToSubmit}
                      required />
                    <FormQuestion
                      variant="password"
                      label="Verify Password"
                      forwardedRef={signupVerifyPasswordRef}
                      onChange={updateReadyToSubmit}
                      required />
                    <ButtonGroup orientation="horizontal" style={{ justifyContent: "flex-end" }}>
                      <Button
                        variant="submit"
                        disabled={!readyToSubmit}>
                        Submit
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

export default Signup;
