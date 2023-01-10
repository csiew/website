export const getEnv = (key: string) => {
  const varValue = process.env[key];
  if (!varValue) throw new Error(`Could not get environment variable: ${key}`);
  return varValue;
};

export default {
  rootElementId: "__next",
  title: {
    text: "Clarence Siew",
    divider: "|"
  },
  version: "6.8.0",
  omdb: {
    apiKey: process.env.OMDB_API_KEY,
    host: "https://omdbapi.com"
  },
  firebase: {
    debugMode: process.env.DEBUG_MODE === "1",
    firebaseOptions: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    }
  },
  features: {
    contactForm: true
  },
  adminEmail: process.env.ADMIN_EMAIL,
  debugMode: process.env.DEBUG_MODE
};
