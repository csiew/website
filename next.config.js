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
    SUPABASE_HOST: getEnv("SUPABASE_HOST"),
    SUPABASE_API_KEY: getEnv("SUPABASE_API_KEY"),
    SUPABASE_DB_USER: getEnv("SUPABASE_DB_USER"),
    SUPABASE_DB_PASSWORD: getEnv("SUPABASE_DB_PASSWORD"),
    SUPABASE_DB_HOST: getEnv("SUPABASE_DB_HOST"),
    SUPABASE_DB_DATABASE: getEnv("SUPABASE_DB_DATABASE"),
    SUPABASE_DB_PORT: getEnv("SUPABASE_DB_PORT"),
    DEBUG_MODE: getEnv("DEBUG_MODE", true)
  }
};
