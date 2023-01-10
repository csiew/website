/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */
import React, { ReactElement } from "react";
import { Show } from "../../../lib/now-watching";
import Paper from "../../ui/Paper";
import NowWatchingShowCard from "../NowWatchingShowCard";

type NowWatchingCardGridProps = {
  title: string;
  keyPrefix: string;
  shows: Array<Show>;
  setSelectedShow?: (id: string) => void;
  filter?: string;
  cornerActions?: string | ReactElement | ReactElement[];
}

const NowWatchingCardGrid = ({ title, keyPrefix, shows, setSelectedShow, filter, cornerActions }: NowWatchingCardGridProps) => {
  let filteredShows;

  switch (filter) {
  case "featured":
    filteredShows = shows.filter((show) => show.recommended);
    break;
  case "all":
  default:
    filteredShows = shows;
  }

  return (
    <section>
      <Paper className="page-now-watching-section">
        <div className="header-bar">
          <h3>{title}</h3>
          <div className="actions">
            { cornerActions }
          </div>
        </div>
        <div className="card-list">
          {
            filteredShows.map((show) => (
              <NowWatchingShowCard key={`${keyPrefix}-${show.imdbId}`} show={show} setSelectedShow={setSelectedShow} />
            ))
          }
        </div>
      </Paper>
    </section>
  );
};

export default NowWatchingCardGrid;
