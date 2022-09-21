import React, { FormEvent, useRef, useState } from "react";
import { Submission, submitContactForm } from "../../../pages/api/contact";
import Button from "../../ui/Button";
import { ButtonVariant } from "../../ui/Button/@types";
import Form from "../../ui/Form";
import FormQuestion from "../../ui/Form/FormQuestion";
import { TextFieldVariant } from "../../ui/TextField/@types";

const ContactForm = () => {
  const contactNameRef = useRef<any>(null);
  const contactEmailRef = useRef<any>(null);
  const contactMessageRef = useRef<any>(null);
  const [contactFormSubmitted, setContactFormSubmitted] = useState<boolean>(false);
  const [contactFormFailed, setContactFormFailed] = useState<boolean>(false);

  const handleSubmitContactForm = async (ev?: FormEvent) => {
    ev?.preventDefault();
    const submission = {
      contactName: contactNameRef.current.value,
      email: contactEmailRef.current.value,
      message: contactMessageRef.current.value
    } as Submission;
    console.log(submission);
    try {
      await submitContactForm(submission);
      setContactFormSubmitted(true);
      setContactFormFailed(false);
    } catch (err) {
      console.error(err);
      setContactFormFailed(true);
    }
  };

  const handleResetContactForm = (ev?: FormEvent) => {
    ev?.preventDefault();
    contactNameRef.current.value = "";
    contactEmailRef.current.value = "";
    contactMessageRef.current.value = "";
  };

  const testPopulateForm = (ev?: FormEvent) => {
    ev?.preventDefault();
    contactNameRef.current.value = "John Doe";
    contactEmailRef.current.value = "john.doe@world.com";
    contactMessageRef.current.value = "test message";
  };

  return (
    <>
      {
        contactFormFailed
          ? <p>Failed to submit form!</p>
          : <></>
      }
      {
        contactFormSubmitted
          ? (
            <>
              <p>Submitted successfully!</p>
              <Button variant={ButtonVariant.RESET} callback={() => setContactFormSubmitted(false)}>
                Reset
              </Button>
            </>
          )
          : (
            <Form onSubmit={handleSubmitContactForm} onReset={handleResetContactForm}>
              <FormQuestion
                name="contactName"
                label="Name"
                variant={TextFieldVariant.TEXT}
                forwardedRef={contactNameRef}
                required
              />
              <FormQuestion
                name="contactEmail"
                label="Email"
                variant={TextFieldVariant.EMAIL}
                forwardedRef={contactEmailRef}
                required
              />
              <FormQuestion
                name="contactMessage"
                label="Message"
                variant={TextFieldVariant.MULTILINE}
                forwardedRef={contactMessageRef}
                required
              />
              <span className="formControls">
                <Button variant={ButtonVariant.PRIMARY} callback={testPopulateForm}>
                  Populate
                </Button>
                <Button variant={ButtonVariant.RESET}>
                  Reset
                </Button>
                <Button variant={ButtonVariant.SUBMIT}>
                  Submit
                </Button>
              </span>
            </Form>
          )
      }
    </>
  );
};

export default ContactForm;
