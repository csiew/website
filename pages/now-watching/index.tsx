import React, { useEffect, useState } from "react";
import Head from "next/head";
import config from "../../config";
import rawShowsData from "./shows.json";
import rawShowsMetadata from "./showsMetadata.json";
import retitle from "../../lib/retitle";
import { OmdbResponse, Show, ShowsData } from "../../lib/now-watching";
import NavigationView from "../../components/ui/NavigationView";
import NowWatchingCardGrid from "../../components/app/NowWatchingCardGrid";
import Modal from "../../components/ui/Modal";
import ShowDetailPage from "./show/[id]";

const showsData = rawShowsData as ShowsData;
const showsMetadata = rawShowsMetadata as Array<Partial<OmdbResponse>>;

let shows = [] as Show[];

const matchShowToMetadata = (id: string) => {
  return showsMetadata.find((sm) => sm.imdbID === id);
};

const getShows = (watching?: boolean) => {
  shows = showsData.shows.sort((a, b) => a.name.localeCompare(b.name));
  if (watching) shows = shows.filter((show) => show.watching);
  return shows
    .map((show) => {
      show.metadata = matchShowToMetadata(show.imdbId);
      return show;
    })
    .filter((show) => show.metadata !== undefined);
};

const getShow = (id: string) => {
  return shows.find((show) => show.imdbId === id);
};

const NowWatching = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedShow, setSelectedShow] = useState<string | null>(null);

  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (selectedShow !== null) {
      setShowModal(true);
    }
  }, [selectedShow]);

  useEffect(() => {
    if (showModal === false && selectedShow !== null) {
      setSelectedShow(null);
    }
  }, [showModal]);

  return (
    <>
      <Head>
        <title>{retitle("Now Watching")}</title>
      </Head>
      <NavigationView
        content={(
          <article className="topLevelPage pageNowWatching">
            <h2>Now Watching</h2>
            <div className="cardList">
              <NowWatchingCardGrid
                title="Currently watching"
                keyPrefix="current"
                shows={getShows(true)}
                setSelectedShow={setSelectedShow}
              />
              <NowWatchingCardGrid
                title="Recent TV shows"
                keyPrefix="recent"
                shows={getShows()}
                setSelectedShow={setSelectedShow}
              />
            </div>
            <section className="acknowledgements">
              <p>Data and posters are courtesy of <a href="https://www.imdb.com/" target="_blank" rel="noreferrer">IMDb</a> and <a href="https://www.omdbapi.com/" target="_blank" rel="noreferrer">OMDb</a></p>
            </section>
          </article>
        )}
      />
      {
        showModal && selectedShow !== null
          ? (
            <Modal closeWindowCallback={() => setShowModal(false)}>
              <ShowDetailPage show={getShow(selectedShow as string) as Show} isInModal={true} />
            </Modal>
          )
          : <></>
      }
    </>
  );
};

export default React.memo(NowWatching);
