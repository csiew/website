/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */
import React from "react";
import { Show } from "../../../lib/now-watching";
import Paper from "../../ui/Paper";
import NowWatchingShowCard from "../NowWatchingShowCard";

type NowWatchingCardGridProps = {
  title: string;
  keyPrefix: string;
  shows: Array<Show>;
}

const NowWatchingCardGrid = ({ title, keyPrefix, shows }: NowWatchingCardGridProps) => {
  return (
    <section>
      <Paper className="pageNowWatchingSection">
        <h3>{title}</h3>
        <div className="cardList">
          {
            shows.map((show) => (
              <NowWatchingShowCard key={`${keyPrefix}-${show.imdbId}`} keyPrefix={keyPrefix} show={show} />
            ))
          }
        </div>
      </Paper>
    </section>
  );
};

export default NowWatchingCardGrid;
