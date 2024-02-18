import { PlaylistData } from "../../lib/playlists";
import rawPlaylistData from "../../resources/playlists.json";
import { getCache, hasCacheExpired, removeCache, storeCache } from "../cache";

export function getPlaylists() {
  try {
    const cachedPlaylists = getCache("playlists");
    if (
      !cachedPlaylists ||
      !Object.keys(cachedPlaylists).length ||
      !Object.keys(cachedPlaylists).includes("body") ||
      hasCacheExpired(cachedPlaylists.expiresAt, cachedPlaylists.readCount)
    ) {
      removeCache("playlists");
      throw new Error("Cache is invalid");
    }
    return cachedPlaylists.body;
  } catch (err) {
    console.error(err);
    const playlists = (rawPlaylistData as PlaylistData).collection.flatMap((group) => group.playlists.special);
    storeCache("playlists", playlists);
    return playlists;
  }
}
