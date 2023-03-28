import config from "../../config";
import { OmdbResponse } from "../../lib/now-watching";

export const getShowDataById = async (id: string): Promise<Partial<OmdbResponse>> => {
  const url = new URL(config.omdb.host);
  url.searchParams.append("i", id);
  url.searchParams.append("apikey", config.omdb.apiKey!);
  console.log(url.toString());
  const response = await fetch(url.toString());
  if (response.status !== 200) {
    throw new Error(`Request to OMDB API failed: ${response.status}`);
  }
  return { id, ...(await response.json() as Partial<OmdbResponse>) };
};
