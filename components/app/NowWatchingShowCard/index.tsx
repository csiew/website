import React from "react";
import { Show } from "../../../lib/now-watching";
import MustWatchBadge from "../MustWatchBadge";

type NowWatchingShowCardProps = {
  keyPrefix: string,
  show: Show
}

const NowWatchingShowCard = ({ keyPrefix, show }: NowWatchingShowCardProps) => {
  return (
    <a href={`/now-watching/show/${show.imdbId}`} className="nowWatchingShowCard">
      <div className="poster">
        <img src={show.metadata?.Poster} alt={show.name} />
      </div>
      <div className="metadata">
        <h4>{show.name}</h4>
        <sub>{show.metadata?.Genre}</sub>
        <sub>{show.metadata?.Year}</sub>
        {
          show.recommended
            ? <MustWatchBadge />
            : <></>
        }
      </div>
    </a>
  );
};

export default NowWatchingShowCard;
