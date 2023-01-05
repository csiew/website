import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Alert from "../../../components/ui/Alert";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import Button from "../../../components/ui/Button";
import Form from "../../../components/ui/Form";
import FormQuestion from "../../../components/ui/Form/FormQuestion";
import NavigationView from "../../../components/ui/NavigationView";
import Paper from "../../../components/ui/Paper";
import config from "../../../config";
import { handleUpdateUserDisplayName } from "../../../firebase/settings";
import retitle from "../../../lib/retitle";

const Settings = ({ isLoggedIn }: any) => {
  const router = useRouter();
  const userDisplayNameRef = useRef<any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleDisplayNameChange = async () => {
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
          <article className="topLevelPage">
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
              <h3>User</h3>
              <section>
                <Form onSubmit={handleDisplayNameChange}>
                  <FormQuestion variant="text" label="Display Name" forwardedRef={userDisplayNameRef} />
                  <Button variant="submit">Save</Button>
                </Form>
              </section>
            </Paper>
          </article>
        )} />
    </>
  );
};

export default Settings;
