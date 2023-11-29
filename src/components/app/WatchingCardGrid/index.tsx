/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */
import React, { ReactElement } from "react";
import { Show } from "../../../lib/watching";
import WatchingShowCard from "../WatchingShowCard";

type WatchingCardGridProps = {
  title: string;
  keyPrefix: string;
  shows: Array<Show>;
  setSelectedShow?: (id: string) => void;
  filter?: string;
  cornerActions?: string | ReactElement | ReactElement[];
}

const WatchingCardGrid = ({ title, keyPrefix, shows, setSelectedShow, filter, cornerActions }: WatchingCardGridProps) => {
  let filteredShows;

  switch (filter) {
  case "mustwatch":
    filteredShows = shows.filter((show) => show.recommended);
    break;
  case "all":
  default:
    filteredShows = shows;
  }

  return (
    <section>
      <div className="page-watching-section">
        <div className="header-bar">
          <h3>{title}</h3>
          <div className="actions">
            { cornerActions }
          </div>
        </div>
        <div className="card-grid">
          {
            filteredShows.map((show) => (
              <WatchingShowCard key={`${keyPrefix}-${show.imdbId}`} show={show} setSelectedShow={setSelectedShow} />
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default WatchingCardGrid;
