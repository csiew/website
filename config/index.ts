import process from "process";

export default {
  rootElementId: "__next",
  title: {
    text: "Clarence Siew",
    divider: "|"
  },
  omdb: {
    apiKey: process.env.OMDB_API_KEY ?? "",
    host: "https://omdbapi.com"
  }
};
