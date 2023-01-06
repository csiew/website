import * as firebase from "@firebase/app";
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword, UserCredential } from "@firebase/auth";
import firebaseAppInstance from ".";
import config from "../config";

type LoginPayload = {
  email: string;
  password: string;
};

if (config.debugMode) {
  console.log("Debug mode enabled");
  firebase.setLogLevel("debug");
}

export const handleLogin = async (loginPayload: LoginPayload): Promise<UserCredential> => {
  if (firebaseAppInstance.auth.currentUser !== null) {
    throw new Error("Already signed in");
  }
  if (loginPayload.email !== config.adminEmail) {
    throw new Error(`Email is not on the accepted emails list: ${loginPayload.email}`);
  }

  await setPersistence(firebaseAppInstance.auth, browserLocalPersistence);
  return await signInWithEmailAndPassword(firebaseAppInstance.auth, loginPayload.email, loginPayload.password);
};

export default handleLogin;
