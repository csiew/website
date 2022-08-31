import React from "react";
import { Show } from "../../../lib/now-watching";
import Button from "../../ui/Button";
import Paper from "../../ui/Paper";

const NowWatchingShowCard = ({ show, keyPrefix }: { show: Show, keyPrefix: string }) => {
  return (
    <section id={`${keyPrefix}-${show.imdbId}`}>
      <Paper className="nowWatchingShowCard">
        <div className="poster">
          <img src={show.metadata?.Poster} alt={show.name} />
        </div>
        <div className="metadata">
          <div>
            <h4>{show.name}</h4>
            <sub>{show.metadata?.Genre}, {show.metadata?.Year}</sub>
          </div>
          <p>
            {show.metadata?.Plot}
          </p>
          <Button url={`https://imdb.com/title/${show.imdbId}`} newTab={true}>
            View in IMDB
          </Button>
        </div>
      </Paper>
    </section>
  );
};

export default NowWatchingShowCard;
