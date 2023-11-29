import React from "react";
import { Show } from "../../../lib/watching";
import Badge from "../../ui/Badge/Badge";

type WatchingShowCardProps = {
  show: Show;
  setSelectedShow?: (id: string) => void;
};

const WatchingShowCard = ({ show, setSelectedShow }: WatchingShowCardProps) => {
  const cardContent = () => {
    return (
      <>
        <div className="poster">
          <img src={show.details?.Poster} alt={show.name} />
        </div>
        <div className="metadata">
          <h4>{show.name}</h4>
          <sub>{show.details?.Genre}</sub>
          <sub>{show.details?.Year}</sub>
          {
            show.recommended
              ? <Badge variant="success">Must Watch</Badge>
              : <></>
          }
        </div>
      </>
    );
  };

  if (setSelectedShow) {
    return (
      <div className="watching-show-card" onClick={() => setSelectedShow(show.imdbId)}>
        {cardContent()}
      </div>
    );
  }
  return (
    <a href={`/watching/show/${show.imdbId}`} className="watching-show-card">
      {cardContent()}
    </a>
  );
};

export default WatchingShowCard;
