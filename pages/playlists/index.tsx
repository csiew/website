import React, { useEffect } from "react";
import Head from "next/head";
import config from "../../config";
import NavigationView from "../../components/ui/NavigationView";
import retitle from "../../lib/retitle";
import { PlaylistData } from "../../lib/playlists";
import rawPlaylistData from "./playlists.json";
import PlaylistCard from "../../components/app/PlaylistCard";
import Paper from "../../components/ui/Paper";

const playlists = (rawPlaylistData as PlaylistData).collection.flatMap((group) => group.playlists.special);

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
        content={(
          <article className="app-page playlists">
            <h2>Playlists</h2>
            <p>
              Every year I add new music I&#8217;ve discovered into annual zeitgeist playlists on Spotify.
            </p>
            <Paper style={{ width: "100%", marginTop: "1rem" }}>
              <div className="card-list">
                {
                  playlists.map((playlist) => {
                    return (
                      <PlaylistCard
                        key={`playlist-${encodeURI(playlist.url)}`}
                        playlist={playlist}
                      />
                    );
                  })
                }
              </div>
            </Paper>
          </article>
        )}
      />
    </>
  );
};

export default Playlists;
