import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Playlists.module.css";
import Card from "../../components/ui/Card/Card";
import { Playlist } from "../../lib/playlists";
import configData from "../../config";
import { getPlaylists as getPlaylistsFromJson } from "../../services/playlists";

export default function Playlists() {
  const isMountedRef = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  async function getPlaylists() {
    try {
      setIsLoading(true);
      const useSectionApis = configData.features.useSectionApis;
      if (useSectionApis) {
        const result = await fetch("/api/playlists");
        if (!result.ok) {
          throw new Error(`Failed to fetch playlists: ${result.status} ${result.statusText}`);
        }
        const data = await result.json();
        setPlaylists(data.playlists);
      } else {
        setPlaylists(getPlaylistsFromJson());
      }
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      getPlaylists();
    }
  }, []);

  return (
    <Card>
      <h2>Playlists</h2>
      {isError && <p>Failed to fetch playlists</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !isError && (
        <div className={styles.playlistList}>
          <ul>
            {
              playlists?.map((playlist) => {
                return (
                  <Link
                    key={`playlist-${encodeURI(playlist.url)}`}
                    href={playlist.url}
                    className={styles.playlistLink}
                  >
                    {playlist.name}
                  </Link>
                );
              })
            }
          </ul>
        </div>
      )}
    </Card>
  );
}
