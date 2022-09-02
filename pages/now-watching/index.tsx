import React, { useEffect } from "react";
import config from "../../config";
import retitle from "../../lib/retitle";
import { OmdbResponse, ShowsData } from "../../lib/now-watching";
import NavigationView from "../../components/ui/NavigationView";
import rawShowsData from "./shows.json";
import rawShowsMetadata from "./showsMetadata.json";
import Paper from "../../components/ui/Paper";
import NowWatchingShowCard from "../../components/app/NowWatchingShowCard";

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
            <section>
              <Paper className="pageNowWatchingSection">
                <h3>Currently watching</h3>
                <div className="cardList">
                  {
                    getShows(true).map((show) => (
                      <NowWatchingShowCard key={`current-${show.imdbId}`} keyPrefix="current" show={show} />
                    ))
                  }
                </div>
              </Paper>
            </section>
            <section>
              <Paper className="pageNowWatchingSection">
                <h3>Recent TV shows</h3>
                <div className="cardList">
                  {
                    getShows().map((show) => (
                      <NowWatchingShowCard key={`recent-${show.imdbId}`} keyPrefix="recent" show={show} />
                    ))
                  }
                </div>
              </Paper>
            </section>
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
