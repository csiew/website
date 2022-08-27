import { PlaylistGroup } from "../../../pages/Playlists/@types";
import Button from "../../ui/Button";
import Paper from "../../ui/Paper";

type PlaylistGroupCardProps = {
  id?: string;
  playlistGroup: PlaylistGroup;
};

const PlaylistGroupCard = ({ id, playlistGroup }: PlaylistGroupCardProps) => {
  return (
    <section className="playlist-group" id={id}>
      <Paper>
        <div className="playlist-group-header">
          <h3>{ playlistGroup.name }</h3>
        </div>
        <div className="playlist-group-body">
          <section className="playlist-group-body-standard">
            {
              playlistGroup.playlists.standard.map((playlist) => {
                return (
                  <Button key={`playlist-${playlistGroup.id}-${playlist.name}`} url={playlist.url}>
                    {playlist.name}
                  </Button>
                );
              })
            }
          </section>
          <section className="playlist-group-body-special">
            {
              playlistGroup.playlists.special.map((playlist) => {
                return (
                  <Button className="primary" key={`playlist-${playlistGroup.id}-${playlist.name}`} url={playlist.url}>
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