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
    DEBUG_MODE: getEnv("DEBUG_MODE", true)
  }
};
