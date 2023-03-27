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
  version: "6.11.0",
  host: {
    baseUrl: "https://clarencesiew.com"
  },
  omdb: {
    apiKey: process.env.OMDB_API_KEY,
    host: "https://omdbapi.com"
  },
  debugMode: process.env.DEBUG_MODE,
  features: {
    classicScrollbar: false
  }
};
