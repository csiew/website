import React, { useEffect } from "react";
import config from "../../config";
import retitle from "../../lib/retitle";
import { OmdbResponse, Show, ShowsData } from "../../lib/now-watching";
// import { getShowDataById } from "../../client/omdb";
import NavigationView from "../../components/ui/NavigationView";
import rawShowsData from "./shows.json";
import rawShowsMetadata from "./showsMetadata.json";
import Paper from "../../components/ui/Paper";
import Button from "../../components/ui/Button";
import NowWatchingShowCard from "../../components/app/NowWatchingShowCard";
import NavigationSidebar from "../../components/ui/NavigationSidebar";
import { scrollCardToTop } from "../../lib/scroll";

const showsData = rawShowsData as ShowsData;
const showsMetadata = rawShowsMetadata as Array<Partial<OmdbResponse>>;

const getShows = (watching?: boolean) => {
  let shows = showsData.shows.sort((a, b) => a.name.localeCompare(b.name));
  if (watching) shows = shows.filter((show) => show.watching);
  return shows.map((show) => {
    show.metadata = showsMetadata.find((sm) => sm.id === show.imdbId);
    return show;
  });
};

const NowWatching = () => {
  useEffect(() => {
    document.title = retitle("Now Watching");
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);

  return (
    <NavigationView
      nav={(
        <NavigationSidebar
          keyPrefix="shortcut"
          items={
            getShows().map((show) => ({
              key: show.imdbId,
              label: show.name,
              callback: () => scrollCardToTop(`recent-${show.imdbId}`)
            }))
          }
        />
      )}
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
        </article>
      )}
    />
  );
};

/*
export const getStaticProps = async () => {
  const omdbShows = await Promise.all(showsData.shows.map((show) => getShowDataById(show.imdbId)));
  console.log(JSON.stringify(omdbShows));
  return { props: { omdbShows } };
};
*/

export default NowWatching;
