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
  host: {
    name: "clarencesiew.com",
    baseUrl: "https://clarencesiew.com"
  },
  omdb: {
    apiKey: process.env.OMDB_API_KEY,
    host: "https://omdbapi.com"
  },
  debugMode: process.env.DEBUG_MODE,
  features: {
    classicScrollbar: false,
    omdbClient: false
  },
  supabase: {
    host: process.env.SUPABASE_HOST,
    apiKey: process.env.SUPABASE_API_KEY
  },
  database: {
    user: process.env.SUPABASE_DB_USER,
    password: process.env.SUPABASE_DB_PASSWORD,
    host: process.env.SUPABASE_DB_HOST,
    database: process.env.SUPABASE_DB_DATABASE,
    port: process.env.SUPABASE_DB_PORT
  }
};
