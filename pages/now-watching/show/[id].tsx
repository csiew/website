import React, { useEffect } from "react";
import config from "../../../config";
import retitle from "../../../lib/retitle";
import { OmdbResponse, Show, ShowsData } from "../../../lib/now-watching";
import NavigationView from "../../../components/ui/NavigationView";
import rawShowsData from "../shows.json";
import rawShowsMetadata from "../showsMetadata.json";
import Button from "../../../components/ui/Button";
import Paper from "../../../components/ui/Paper";

const showsData = rawShowsData as ShowsData;
const showsMetadata = rawShowsMetadata as Array<Partial<OmdbResponse>>;

const ShowDetailPage = ({ show }: { show: Show }) => {
  useEffect(() => {
    document.title = retitle(show.name);
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
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
      <div className="toolbar">
        <Button callback={() => history.go(-1)}>
          &#8592; Back
        </Button>
        {
          show.recommended
            ? <span className="mustWatchBadge">Must Watch</span>
            : <></>
        }
      </div>
      <NavigationView
        className="pageShowDetail"
        content={(
          <article className="topLevelPage">
            <h2>{show.name}</h2>
            <section className="showInfo">
              <div className="cardList">
                <Paper className="showDataDetails">
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
