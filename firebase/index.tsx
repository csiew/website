import { FirebaseApp, initializeApp } from "@firebase/app";
import { Firestore } from "@firebase/firestore";
import { getFirestore } from "@firebase/firestore/lite";
import { Auth, getAuth } from "@firebase/auth";
import config from "../config";

class FirebaseAppInstance {
  app: FirebaseApp;
  db: Firestore;
  auth: Auth;

  constructor() {
    this.app = initializeApp(config.firebase.firebaseOptions);
    this.db = getFirestore(this.app);
    this.auth = getAuth(this.app);
  }
}

export default new FirebaseAppInstance();
