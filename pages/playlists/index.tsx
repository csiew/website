import React, { useEffect } from "react";
import Head from "next/head";
import config from "../../config";
import PlaylistGroupCard from "../../components/app/PlaylistGroupCard";
import NavigationSidebar from "../../components/ui/NavigationSidebar";
import NavigationView from "../../components/ui/NavigationView";
import retitle from "../../lib/retitle";
import { PlaylistData } from "../../lib/playlists";
import rawPlaylistData from "./playlists.json";
import { scrollCardToTop } from "../../lib/scroll";

const playlistData = rawPlaylistData as PlaylistData;

const Playlists = () => {
  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Head>
        <title>{retitle("Playlists")}</title>
        <meta property="og:title" content={retitle("Playlists")} key="title" />
      </Head>
      <NavigationView
        navPosition="right"
        nav={(
          <NavigationSidebar
            keyPrefix="playlist-shortcut-"
            items={
              playlistData.collection.map((playlistGroup) => ({
                key: playlistGroup.id,
                label: playlistGroup.name,
                callback: () => scrollCardToTop(playlistGroup.id)
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
    </>
  );
};

export default React.memo(Playlists);
