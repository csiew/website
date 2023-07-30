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
    MIGRATION_SUPABASE_DB_USER: getEnv("MIGRATION_SUPABASE_DB_USER"),
    MIGRATION_SUPABASE_DB_PASSWORD: getEnv("MIGRATION_SUPABASE_DB_PASSWORD"),
    MIGRATION_SUPABASE_DB_HOST: getEnv("MIGRATION_SUPABASE_DB_HOST"),
    MIGRATION_SUPABASE_DB_DATABASE: getEnv("MIGRATION_SUPABASE_DB_DATABASE"),
    MIGRATION_SUPABASE_DB_PORT: getEnv("MIGRATION_SUPABASE_DB_PORT"),
    DEBUG_MODE: getEnv("DEBUG_MODE", true)
  }
};
