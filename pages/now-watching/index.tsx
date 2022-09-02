import React, { useEffect } from "react";
import config from "../../config";
import retitle from "../../lib/retitle";
import { OmdbResponse, ShowsData } from "../../lib/now-watching";
import NavigationView from "../../components/ui/NavigationView";
import rawShowsData from "./shows.json";
import rawShowsMetadata from "./showsMetadata.json";
import Paper from "../../components/ui/Paper";
import NowWatchingShowCard from "../../components/app/NowWatchingShowCard";
import NowWatchingCardGrid from "../../components/app/NowWatchingCardGrid";

const showsData = rawShowsData as ShowsData;
const showsMetadata = rawShowsMetadata as Array<Partial<OmdbResponse>>;

const getShows = (watching?: boolean) => {
  let shows = showsData.shows.sort((a, b) => a.name.localeCompare(b.name));
  if (watching) shows = shows.filter((show) => show.watching);
  return shows
    .map((show) => {
      show.metadata = showsMetadata.find((sm) => sm.imdbID === show.imdbId);
      return show;
    })
    .filter((show) => show.metadata !== undefined);
};

const NowWatching = () => {
  useEffect(() => {
    document.title = retitle("Now Watching");
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);

  return (
    <NavigationView
      content={(
        <article className="topLevelPage pageNowWatching">
          <h2>Now Watching</h2>
          <div className="cardList">
            <NowWatchingCardGrid
              title="Currently watching"
              keyPrefix="current"
              shows={getShows(true)}
            />
            <NowWatchingCardGrid
              title="Recent TV shows"
              keyPrefix="recent"
              shows={getShows()}
            />
          </div>
          <section className="acknowledgements">
            <p>Data and posters are courtesy of <a href="https://www.imdb.com/" target="_blank" rel="noreferrer">IMDb</a> and <a href="https://www.omdbapi.com/" target="_blank" rel="noreferrer">OMDb</a></p>
          </section>
        </article>
      )}
    />
  );
};

export default NowWatching;
