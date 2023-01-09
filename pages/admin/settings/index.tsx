import Head from "next/head";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import Alert from "../../../components/ui/Alert";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import Button from "../../../components/ui/Button";
import Form from "../../../components/ui/Form";
import FormQuestion from "../../../components/ui/Form/FormQuestion";
import NavigationView from "../../../components/ui/NavigationView";
import Paper from "../../../components/ui/Paper";
import config from "../../../config";
import { handleUpdateUserDisplayName, handleUpdateUserPassword } from "../../../firebase/settings";
import retitle from "../../../lib/retitle";
import { isValidPassword } from "../../../lib/validate";

const Settings = ({ isLoggedIn }: any) => {
  const router = useRouter();
  const userDisplayNameRef = useRef<any>(null);

  const currentPasswordRef = useRef<any>(null);
  const newPasswordRef = useRef<any>(null);
  const verifyNewPasswordRef = useRef<any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [readyToSubmitChangePassword, setReadyToSubmitChangePassword] = useState<boolean>(false);

  const handleDisplayNameChange = async (ev?: FormEvent<Element>) => {
    ev?.preventDefault();
    setIsLoading(true);
    setHasSubmitted(false);
    try {
      await handleUpdateUserDisplayName(userDisplayNameRef.current.value);
      setIsSuccess(true);
    } catch (err) {
      if (config.debugMode) console.error(err);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
      setHasSubmitted(true);
    }
  };

  const handleUpdatePassword = async (ev?: FormEvent<Element>) => {
    ev?.preventDefault();
    setIsLoading(true);
    setHasSubmitted(false);
    try {
      if (
        newPasswordRef.current.value !== verifyNewPasswordRef.current.value &&
        !isValidPassword(newPasswordRef.current.value)
      ) {
        throw new Error("Invalid password");
      }
      await handleUpdateUserPassword(
        currentPasswordRef.current.value,
        newPasswordRef.current.value
      );
      setIsSuccess(true);
    } catch (err) {
      if (config.debugMode) console.error(err);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
      setHasSubmitted(true);
    }
  };

  const updateReadyToSubmitChangePassword = () => {
    setReadyToSubmitChangePassword(
      currentPasswordRef.current.value.length > 0 &&
      newPasswordRef.current.value.length > 0 &&
      verifyNewPasswordRef.current.value.length > 0 &&
      newPasswordRef.current.value ===  verifyNewPasswordRef.current.value &&
      currentPasswordRef.current.value !== newPasswordRef.current.value &&
      isValidPassword(newPasswordRef.current.value)
    );
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/admin");
    }
  }, [isLoggedIn]);

  return (
    <>
      <Head>
        <title>{retitle("Settings")}</title>
        <meta property="og:title" content={retitle("Admin")} key="title" />
      </Head>
      <Breadcrumbs
        items={[
          {
            title: "Admin",
            href: "/admin"
          },
          {
            title: "Settings"
          }
        ]} />
      <NavigationView
        content={(
          <article className="appPage" style={{ gap: "1rem" }}>
            <h2>Settings</h2>
            {
              isLoading
                ? (
                  <Alert variant="plain" style={{ marginBottom: "1rem" }}>
                    Saving...
                  </Alert>
                )
                : <></>
            }
            {
              hasSubmitted && isSuccess && !isLoading
                ? (
                  <Alert variant="success" style={{ marginBottom: "1rem" }}>
                    Saved settings
                  </Alert>
                )
                : <></>
            }
            {
              hasSubmitted && !isSuccess && !isLoading
                ? (
                  <Alert variant="error" style={{ marginBottom: "1rem" }}>
                    Failed to save settings
                  </Alert>
                )
                : <></>
            }
            <Paper>
              <h3>Profile</h3>
              <section style={{ width: "100%", marginTop: "1rem" }}>
                <Form onSubmit={handleDisplayNameChange}>
                  <FormQuestion variant="text" label="Display Name" forwardedRef={userDisplayNameRef} />
                  <Button variant="submit">Save</Button>
                </Form>
              </section>
            </Paper>
            <Paper>
              <h3>Update password</h3>
              <section style={{ width: "100%", marginTop: "1rem" }}>
                <Form onSubmit={handleUpdatePassword}>
                  <FormQuestion
                    variant="password"
                    label="Current Password"
                    forwardedRef={currentPasswordRef}
                    onChange={updateReadyToSubmitChangePassword} />
                  <FormQuestion
                    variant="password"
                    label="New Password"
                    forwardedRef={newPasswordRef}
                    onChange={updateReadyToSubmitChangePassword} />
                  <FormQuestion
                    variant="password"
                    label="Verify New Password"
                    forwardedRef={verifyNewPasswordRef}
                    onChange={updateReadyToSubmitChangePassword} />
                  <Button variant="submit" disabled={!readyToSubmitChangePassword}>Update Password</Button>
                </Form>
              </section>
            </Paper>
          </article>
        )} />
    </>
  );
};

export default Settings;
