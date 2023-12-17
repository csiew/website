import { PlaylistData } from "../../lib/playlists";
import rawPlaylistData from "../../resources/playlists.json";

export function getPlaylists() {
  return (rawPlaylistData as PlaylistData).collection.flatMap((group) => group.playlists.special);
}
