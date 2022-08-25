import { useEffect } from "react";
import PlaylistGroupCard from "../../components/app/PlaylistGroupCard";
import retitle from "../../lib/retitle";
import { PlaylistData } from "./@types";
import rawPlaylistData from "./playlists.json";

const playlistData = rawPlaylistData as PlaylistData;

const Playlists = () => {
  useEffect(() => {
    document.title = retitle("Playlists");
    document.getElementById("root")?.scrollTo({ top: 0 });
  }, []);

  return (
    <article className="top-level-page">
      <h2>Playlists</h2>
      <div className="card-list">
        {
          playlistData.collection.map((playlistGroup) => {
            return (
              <PlaylistGroupCard key={`playlist-group-${playlistGroup.id}`} playlistGroup={playlistGroup} />
            );
          })
        }
      </div>
    </article>
  );
};

export default Playlists;
