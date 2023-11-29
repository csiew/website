import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import config from "../../config";
import retitle from "../../lib/retitle";
import { OmdbResponse, Show } from "../../lib/watching";
import { getShowDataById } from "../../client/omdb";
import NavigationView from "../../components/ui/NavigationView";
import WatchingCardGrid from "../../components/app/WatchingCardGrid";
import Modal from "../../components/ui/Modal";
import ShowDetailPage from "./show/[id]";
import Paper from "../../components/ui/Paper";
import { queryDbRest } from "../../client/db";

function Watching({ shows }: { shows: Show[] }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedShow, setSelectedShow] = useState<string | null>(null);
  const [recentFilter, setRecentFilter] = useState<string>("all");
  const [historyFilter, setHistoryFilter] = useState<string>("all");
  const [omdbClientResult, setOmdbClientResult] = useState<Partial<OmdbResponse>>({});

  const handleGetOmdbSubmit = async (ev: any): Promise<Partial<OmdbResponse>> => {
    ev.preventDefault();
    const imdbId = ev.currentTarget.imdbId.value;
    let result: Partial<OmdbResponse> = {};
    try {
      result = await getShowDataById(imdbId);
    } catch (err) {
      console.error(err);
    }
    setOmdbClientResult(result);
    return result;
  };

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
      router.push("/watching",undefined, { shallow: true });
    }
  }, [showModal]);

  return (
    <>
      <Head>
        <title>{retitle("Watching")}</title>
        <meta property="og:title" content={retitle("Watching")} key="title" />
      </Head>
      <NavigationView
        className="blockquotes-as-notes"
        content={(
          <article className="app-page page-watching">
            <h2>Watching</h2>
            {
              config.features.omdbClient && (
                <Paper>
                  <form onSubmit={handleGetOmdbSubmit}>
                    <span className="form-field">
                      <label htmlFor="imdbId">IMDB ID</label>
                      <input type="text" name="imdbId" style={{ width: "100%" }} />
                    </span>
                    <input type="submit" value="Get show" />
                    {
                      Object.entries(omdbClientResult).length > 0
                        ? (
                          <>
                            <hr />
                            <pre
                              className={config.features.classicScrollbar ? "classic-scrollbar" : undefined}
                              style={{ width: "100%", overflow: "auto" }}
                            >
                              {JSON.stringify(omdbClientResult, null, 2)}
                            </pre>
                          </>
                        )
                        : <></>
                    }
                  </form>
                </Paper>
              )
            }
            <blockquote style={{ maxWidth: "720px", marginInline: "auto" }}>
              <p>
                Only TV shows are listed here. The movies I&apos;ve watched are not listed here. I generally find TV shows to be far more memorable.
              </p>
            </blockquote>
            <div className="card-list">
              <WatchingCardGrid
                title="Recently watched"
                keyPrefix="current"
                shows={shows.filter((show) => show.watching)}
                setSelectedShow={setSelectedShow}
                filter={recentFilter}
                cornerActions={(
                  <select defaultValue="all" onChange={(e) => setRecentFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="mustwatch">Must Watch</option>
                  </select>
                )}
              />
              <WatchingCardGrid
                title="Viewing history"
                keyPrefix="recent"
                shows={shows}
                setSelectedShow={setSelectedShow}
                filter={historyFilter}
                cornerActions={(
                  <select defaultValue="all" onChange={(e) => setHistoryFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="mustwatch">Must Watch</option>
                  </select>
                )}
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
              <ShowDetailPage show={shows.find((show) => show.imdbId === selectedShow)} isInModal={true} />
            </Modal>
          )
          : <></>
      }
    </>
  );
}

export async function getStaticProps() {
  const result = await queryDbRest("item", "content_type=eq.tv_show");
  const shows = result.sort((a: Show, b: Show) => a.name.localeCompare(b.name));
  return { props: { shows } };
}

export default Watching;
