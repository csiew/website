import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import config from "../../../config";
import retitle from "../../../lib/retitle";
import { Show } from "../../../lib/watching";
import NavigationView from "../../../components/ui/NavigationView";
import Button from "../../../components/ui/Button";
import Paper from "../../../components/ui/Paper";
import Breadcrumbs from "../../../components/ui/Breadcrumbs/Breadcrumbs";
import { queryDbRest } from "../../../client/db";

function ShowDetailPage({ show, isInModal }: { show?: Show, isInModal?: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (!isInModal) {
      document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
    } else {
      router.push("/watching", `/watching/show/${show?.imdbId}`, { shallow: true });
    }
  }, []);
  
  const details = {
    "Year": show?.details?.Year,
    "Genre": show?.details?.Genre,
    "Language": show?.details?.Language,
    "Country": show?.details?.Country,
    "Starring": show?.details?.Actors,
    "Seasons": show?.details?.totalSeasons,
  };

  if (!show) {
    return <p>Show not found</p>;
  }

  return (
    <>
      <Head>
        <title>{retitle(show.name)}</title>
        <meta property="og:title" content={retitle(show.name)} key="title" />
      </Head>
      {
        !isInModal && (
          <Breadcrumbs
            items={[
              {
                title: "Watching",
                href: "/watching"
              },
              {
                title: "Show"
              },
              {
                title: show.name
              }
            ]}
          />
        )
      }
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
                  <p>{show.details?.Plot}</p>
                </Paper>
                <Button
                  variant="link"
                  url={`https://imdb.com/title/${show.imdbId}`}
                  newTab
                  style={{ marginBlock: "1rem 2rem", alignSelf: "center" }}
                >
                  Visit IMDb page
                </Button>
              </div>
              <img src={show.details?.Poster} height="320px" alt={show.name} />
            </section>
          </article>
        )}
      />
    </>
  );
}

export async function getStaticPaths() {
  const shows = await queryDbRest("item", "content_type=eq.tv_show");
  const paths = shows.map((show: Show) => ({
    params: { id: show.imdbId },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const { id } = params;
  const shows = await queryDbRest("item", `content_type=eq.tv_show&body->>imdbId=eq.${id}`);
  const show = shows?.[0];
 
  return { props: { show } };
}

export default ShowDetailPage;
