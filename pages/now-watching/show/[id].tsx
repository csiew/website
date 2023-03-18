import React, { useEffect } from "react";
import Head from "next/head";
import config from "../../../config";
import rawShowsData from "../shows.json";
import rawShowsMetadata from "../showsMetadata.json";
import retitle from "../../../lib/retitle";
import { OmdbResponse, Show, ShowsData } from "../../../lib/now-watching";
import NavigationView from "../../../components/ui/NavigationView";
import Button from "../../../components/ui/Button";
import Paper from "../../../components/ui/Paper";
import Toolbar from "../../../components/ui/Toolbar";

const showsData = rawShowsData as ShowsData;
const showsMetadata = rawShowsMetadata as Array<Partial<OmdbResponse>>;

const ShowDetailPage = ({ show, isInModal }: { show: Show, isInModal?: boolean }) => {
  useEffect(() => {
    if (!isInModal) {
      document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
    }
  }, []);
  
  const details = {
    "Year": show.metadata?.Year,
    "Genre": show.metadata?.Genre,
    "Language": show.metadata?.Language,
    "Country": show.metadata?.Country,
    "Starring": show.metadata?.Actors,
    "Seasons": show.metadata?.totalSeasons,
  };

  return (
    <>
      {
        !isInModal && (
          <Toolbar>
            <Button onClick={() => history.go(-1)}>
              &#8592; Back
            </Button>
          </Toolbar>
        )
      }
      <Head>
        <title>{retitle(show.name)}</title>
        <meta property="og:title" content={retitle(show.name)} key="title" />
      </Head>
      <NavigationView
        className="show-detail-page"
        content={(
          <article className="app-page">
            <h2>{show.name}</h2>
            <section className={["show-info", isInModal ? "column" : ""].join(" ")}>
              <div className="card-list">
                <Paper className="show-data-details">
                  {
                    Object.entries(details).map((detail) => {
                      return (
                        <div key={detail[0]} className="row">
                          <div className="key">
                            {detail[0]}
                          </div>
                          <div className="value">
                            {detail[1]}
                          </div>
                        </div>
                      );
                    })
                  }
                </Paper>
                <Paper>
                  <h3>Plot</h3>
                  <p>{show.metadata?.Plot}</p>
                </Paper>
              </div>
              <img src={show.metadata?.Poster} height="320px" alt={show.name} />
            </section>
          </article>
        )}
      />
    </>
  );
};

export const getStaticPaths = () => {
  return {
    paths: showsData.shows.map((show) => ({
      params: {
        id: show.imdbId
      },
    })),
    fallback: false
  };
};

export const getStaticProps = async (context: any) => {
  const { id } = context.params;
  const show = showsData.shows.find((s: Show) => s.imdbId === id);
  if (!show) throw new Error("Show not found");
  show.metadata = showsMetadata.find((sm: Partial<OmdbResponse>) => sm.imdbID === show.imdbId);
  return {
    props: { show }
  };
};

export default ShowDetailPage;
