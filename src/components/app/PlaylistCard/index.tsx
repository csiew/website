import React from "react";
import { Playlist } from "../../../lib/playlists";

const PlaylistCard = ({ playlist }: { playlist: Playlist }) => {
  return (
    <a className="playlistCard" href={playlist.url} target="_blank" rel="noreferrer">
      <h3>{playlist.name}</h3>
    </a>
  );
};

export default PlaylistCard;
