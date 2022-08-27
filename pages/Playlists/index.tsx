import React, { useEffect } from "react";
import PlaylistGroupCard from "../../components/app/PlaylistGroupCard";
import NavigationSidebar from "../../components/ui/NavigationSidebar";
import NavigationView from "../../components/ui/NavigationView";
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
    <NavigationView
      nav={(
        <NavigationSidebar
          keyPrefix="playlist-shortcut-"
          items={
            playlistData.collection.map((playlistGroup) => ({
              key: playlistGroup.id,
              url: `#${playlistGroup.id}`,
              label: playlistGroup.name
            }))
          }
        />
      )}
      content={(
        <article className="topLevelPage">
          <h2>Playlists</h2>
          <div className="cardList">
            {
              playlistData.collection.map((playlistGroup) => {
                return (
                  <PlaylistGroupCard
                    key={`playlistGroup-${playlistGroup.id}`}
                    id={playlistGroup.id}
                    playlistGroup={playlistGroup}
                  />
                );
              })
            }
          </div>
        </article>
      )}
    />
  );
};

export default Playlists;
