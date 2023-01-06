/* eslint-disable no-undef */

function getEnv(key, optional=false) {
  let varValue = process.env[key];
  if (!varValue) {
    if (!optional) throw new Error(`Could not get environment variable: ${key}`);
    varValue = "";
  }
  return varValue;
}

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  env: {
    OMDB_API_KEY: getEnv("OMDB_API_KEY"),
    FIREBASE_API_KEY: getEnv("FIREBASE_API_KEY"),
    FIREBASE_AUTH_DOMAIN: getEnv("FIREBASE_AUTH_DOMAIN"),
    FIREBASE_PROJECT_ID: getEnv("FIREBASE_PROJECT_ID"),
    FIREBASE_STORAGE_BUCKET: getEnv("FIREBASE_STORAGE_BUCKET"),
    FIREBASE_MESSAGING_SENDER_ID: getEnv("FIREBASE_MESSAGING_SENDER_ID"),
    FIREBASE_APP_ID: getEnv("FIREBASE_APP_ID"),
    ADMIN_EMAIL: getEnv("ADMIN_EMAIL"),
    DEBUG_MODE: getEnv("DEBUG_MODE", true)
  }
};
