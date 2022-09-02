import React from "react";
import { Show } from "../../../lib/now-watching";

const NowWatchingShowCard = ({ show, keyPrefix }: { show: Show, keyPrefix: string }) => {
  return (
    <section id={`${keyPrefix}-${show.imdbId}`}>
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
              ? <span className="mustWatchBadge">Must Watch</span>
              : <></>
          }
        </div>
      </a>
    </section>
  );
};

export default NowWatchingShowCard;
