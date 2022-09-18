import * as firebase from "@firebase/app";
import { FirebaseApp, initializeApp } from "@firebase/app";
import { AppCheck, initializeAppCheck, ReCaptchaV3Provider } from "@firebase/app-check";
import {
  addDoc,
  collection,
  Firestore,
  getFirestore,
  Timestamp
} from "@firebase/firestore/lite";
import config from "./config";

let app: FirebaseApp;
let appCheck: AppCheck;
let db: Firestore;

export type Submission = {
  contactName: string;
  email: string;
  message: string;
};

if (config.debugMode === true) {
  console.log("Debug mode enabled");
  firebase.setLogLevel("debug");
}

export const submitContactForm = async (submission: Submission) => {
  if (!app) app = initializeApp(config.firebaseOptions);
  if (!appCheck) appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(config.appCheck.siteKey!),
    isTokenAutoRefreshEnabled: true
  });
  if (!db) db = getFirestore(app);
  await addDoc(
    collection(db, "contact"),
    {
      ...submission,
      date: Timestamp.fromDate(new Date())
    }
  );
};
