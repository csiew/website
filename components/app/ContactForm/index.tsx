import React, { FormEvent, useRef, useState } from "react";
import contactApiConfig from "../../../config";
import { Submission, submitContactForm } from "../../../firebase/contact";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormQuestion from "../../ui/Form/FormQuestion";
import Paper from "../../ui/Paper";
import Alert from "../../ui/Alert";

const ContactForm = () => {
  const contactNameRef = useRef<any>(null);
  const contactEmailRef = useRef<any>(null);
  const contactMessageRef = useRef<any>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [contactFormSubmitted, setContactFormSubmitted] = useState<boolean>(false);
  const [contactFormFailed, setContactFormFailed] = useState<boolean>(false);
  const [isReadyForSubmission, setIsReadyForSubmission] = useState<boolean>(false);

  const updateIsReadyForSubmission = () => {
    setIsReadyForSubmission(
      contactNameRef.current.value.length > 0 &&
      contactEmailRef.current.value.length > 0 &&
      contactMessageRef.current.value.length > 0
    );
  };

  const handleSubmitContactForm = async (ev?: FormEvent) => {
    ev?.preventDefault();
    const submission = {
      contactName: contactNameRef.current.value,
      email: contactEmailRef.current.value,
      message: contactMessageRef.current.value,
      isTest: contactApiConfig.firebase.debugMode
    } as Submission;
    try {
      setIsSubmitting(true);
      await submitContactForm(submission);
      setContactFormSubmitted(true);
      setContactFormFailed(false);
    } catch (err) {
      console.error(err);
      setContactFormFailed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetContactForm = (ev?: FormEvent) => {
    ev?.preventDefault();
    contactNameRef.current.value = "";
    contactEmailRef.current.value = "";
    contactMessageRef.current.value = "";
    updateIsReadyForSubmission();
  };

  const testPopulateForm = (ev?: FormEvent) => {
    ev?.preventDefault();
    contactNameRef.current.value = "John Doe";
    contactEmailRef.current.value = "john.doe@world.com";
    contactMessageRef.current.value = "test message";
    updateIsReadyForSubmission();
  };

  return (
    <Paper className="contactForm" style={{ width: "100%" }}>
      <h3>Contact</h3>
      {
        isSubmitting
          ? (
            <Alert variant="plain" style={{ marginBottom: "1rem" }}>
              Submitting your message...
            </Alert>
          )
          : <></>
      }
      {
        contactApiConfig.firebase.debugMode
          ? (
            <Alert variant="warning" style={{ marginBottom: "1rem" }}>
              API is in debug mode
            </Alert>
          )
          : <></>
      }
      {
        contactFormFailed
          ? (
            <Alert variant="error" style={{ marginBottom: "1rem" }}>
              Failed to submit form!
            </Alert>
          )
          : <></>
      }
      {
        contactFormSubmitted
          ? (
            <>
              <Alert variant="success" style={{ marginBottom: "1rem" }}>
                Submitted successfully!
              </Alert>
            </>
          )
          : (
            <Form onSubmit={handleSubmitContactForm} onReset={handleResetContactForm}>
              <FormQuestion
                name="contactName"
                label="Name"
                variant="text"
                forwardedRef={contactNameRef}
                onChange={updateIsReadyForSubmission}
                disabled={isSubmitting}
                required
              />
              <FormQuestion
                name="contactEmail"
                label="Email"
                variant="email"
                forwardedRef={contactEmailRef}
                onChange={updateIsReadyForSubmission}
                disabled={isSubmitting}
                required
              />
              <FormQuestion
                name="contactMessage"
                label="Message"
                variant="multiline"
                style={{ resize: "vertical" }}
                forwardedRef={contactMessageRef}
                onChange={updateIsReadyForSubmission}
                disabled={isSubmitting}
                required
              />
              <span className="formControls">
                {
                  contactApiConfig.firebase.debugMode
                    ? (
                      <>
                        <Button variant="primary" onClick={testPopulateForm} disabled={isSubmitting}>
                          Populate
                        </Button>
                        <Button variant="reset" disabled={isSubmitting}>
                          Reset
                        </Button>
                      </>
                    )
                    : <></>
                }
                <Button variant="submit" disabled={!isReadyForSubmission || isSubmitting}>
                  Submit
                </Button>
              </span>
            </Form>
          )
      }
    </Paper>
  );
};

export default ContactForm;
