import * as firebase from "@firebase/app";
import { createUserWithEmailAndPassword, UserCredential } from "@firebase/auth";
import firebaseAppInstance from ".";
import config from "../config";

type SignupPayload = {
  email: string;
  password: string;
};

if (config.debugMode) {
  console.log("Debug mode enabled");
  firebase.setLogLevel("debug");
}

export const handleSignup = async (signupPayload: SignupPayload): Promise<UserCredential> => {
  if (firebaseAppInstance.auth.currentUser !== null) {
    throw new Error("Already signed in");
  }
  if (signupPayload.email !== config.adminEmail) {
    throw new Error(`Email is not on the accepted emails list: ${signupPayload.email}`);
  }
  return await createUserWithEmailAndPassword(firebaseAppInstance.auth, signupPayload.email, signupPayload.password);
};

export default handleSignup;
