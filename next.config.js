/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {};

function getEnv(key, optional=false) {
  let varValue = process.env[key];
  if (!varValue) {
    if (!optional) throw new Error(`Could not get environment variable: ${key}`);
    varValue = "";
  }
  return varValue;
}

const combinedConfig = {
  ...nextConfig,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.resolve.extensionAlias = {
      ".js": [".js", ".ts"],
      ".jsx": [".jsx", ".tsx"],
  };

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

module.exports = combinedConfig;
