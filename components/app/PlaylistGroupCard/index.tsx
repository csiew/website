import React from "react";
import { PlaylistGroup } from "../../../lib/playlists";
import Button from "../../ui/Button";
import Paper from "../../ui/Paper";

type PlaylistGroupCardProps = {
  id?: string;
  playlistGroup: PlaylistGroup;
};

const PlaylistGroupCard = ({ id, playlistGroup }: PlaylistGroupCardProps) => {
  return (
    <section className="playlistGroup" id={id}>
      <Paper>
        <div className="playlistGroupHeader">
          <h3>{ playlistGroup.name }</h3>
        </div>
        <div className="playlistGroupBody">
          <section className="playlistGroupStandardBody">
            {
              playlistGroup.playlists.standard.map((playlist) => {
                return (
                  <Button variant="link" key={`playlist-${playlistGroup.id}-${playlist.name}`} url={playlist.url}>
                    {playlist.name}
                  </Button>
                );
              })
            }
          </section>
          <section className="playlistGroupSpecialBody">
            {
              playlistGroup.playlists.special.map((playlist) => {
                return (
                  <Button variant="link" className="primary" key={`playlist-${playlistGroup.id}-${playlist.name}`} url={playlist.url}>
                    {playlist.name}
                  </Button>
                );
              })
            }
          </section>
        </div>
      </Paper>
    </section>
  );
};

export default PlaylistGroupCard;
