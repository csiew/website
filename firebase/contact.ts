import * as firebase from "@firebase/app";
import {
  addDoc,
  collection,
  Timestamp
} from "@firebase/firestore/lite";
import firebaseAppInstance from ".";
import config from "../config";

export type Submission = {
  contactName: string;
  email: string;
  message: string;
  isTest?: boolean;
};

if (config.debugMode) {
  console.log("Debug mode enabled");
  firebase.setLogLevel("debug");
}

export const submitContactForm = async (submission: Submission) => {
  await addDoc(
    collection(firebaseAppInstance.db, "contact"),
    {
      ...submission,
      date: Timestamp.fromDate(new Date())
    }
  );
};
