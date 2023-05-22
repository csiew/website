import React, { ChangeEvent, FocusEvent, useEffect, useRef, useState } from "react";
import Head from "next/head";
import Fuse from "fuse.js";
import config from "../../config";
import rawShowsData from "./shows.json";
import rawShowsMetadata from "./showsMetadata.json";
import retitle from "../../lib/retitle";
import { OmdbResponse, Show, ShowsData } from "../../lib/watching";
import { getShowDataById } from "../../client/omdb";
import NavigationView from "../../components/ui/NavigationView";
import WatchingCardGrid from "../../components/app/WatchingCardGrid";
import Modal from "../../components/ui/Modal";
import ShowDetailPage from "./show/[id]";
import Dropdown from "../../components/ui/Dropdown";
import Paper from "../../components/ui/Paper";
import Button from "../../components/ui/Button";
import TextField from "../../components/ui/TextField";
import Form from "../../components/ui/Form";
import { useRouter } from "next/router";

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

const getShowsByIds = (ids: string[]) => {
  shows = showsData.shows
    .filter((show) => ids.includes(show.imdbId))
    .sort((a, b) => a.name.localeCompare(b.name));
  const results = shows
    .map((show) => {
      show.metadata = matchShowToMetadata(show.imdbId);
      return show;
    })
    .filter((show) => show.metadata !== undefined);
  return results;
};

const getShow = (id: string) => {
  return shows.find((show) => show.imdbId === id);
};

const NowWatching = () => {
  const router = useRouter();
  const fuse = new Fuse(
    showsMetadata,
    {
      threshold: 0.3,
      keys: ["imdbID", "Title", "Actors", "Director", "Writer", "Genre", "Country"]
    }
  );

  const searchFieldRef = useRef<any>(null);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedShow, setSelectedShow] = useState<string | null>(null);
  const [recentFilter, setRecentFilter] = useState<string>("all");
  const [historyFilter, setHistoryFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<string>("grid");
  const [omdbClientResult, setOmdbClientResult] = useState<Partial<OmdbResponse>>({});
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchKeywords, setSearchKeywords] = useState<string>("");

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

  const handleSearchShows = (ev: ChangeEvent) => {
    const keywords = (ev.currentTarget as any).value;
    setSearchKeywords(keywords);
    if (keywords.length) {
      const results = fuse.search(keywords);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleEscapeSearch = (ev: KeyboardEvent) => {
    if (ev.key === "Escape") {
      const searchField = ev.currentTarget as any;
      // if (!searchField) return;
      setSearchKeywords("");
      searchFieldRef.current.value = "";
      searchField?.removeEventListener("keydown", handleEscapeSearch);
      (document.activeElement as any)?.blur();
    }
  };

  const handleFocusSearch = (ev: FocusEvent) => {
    (ev.currentTarget as any).addEventListener("keydown", handleEscapeSearch);
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
                <Paper style={{ width: "100%" }}>
                  <Form onSubmit={handleGetOmdbSubmit}>
                    <div style={{
                      width: "100%",
                      display: "inline-flex",
                      flexFlow: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "0.5rem"
                    }}>
                      <TextField variant="text" name="imdbId" placeholder="IMDB ID" style={{ width: "100%" }} />
                      <Button variant="submit">Get</Button>
                    </div>
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
                  </Form>
                </Paper>
              )
            }
            <blockquote style={{ maxWidth: "720px", marginInline: "auto" }}>
              <p>
                Only TV shows are listed here. The movies I&apos;ve watched are not listed here. I generally find TV shows to be far more memorable.
              </p>
            </blockquote>
            <div style={{
              width: "100%",
              margin: "0rem 0rem 2rem 0rem",
              padding: 0,
              display: "inline-flex",
              flexFlow: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem"
            }}>
              <Dropdown
                options={[
                  { value: "grid", label: "Grid" },
                  { value: "list", label: "List" }
                ]}
                selectedValue={viewMode}
                setSelectedValue={setViewMode}
                style={{ height: "100%" }}
              />
              <TextField
                forwardedRef={searchFieldRef}
                variant="search"
                name="showfilter"
                placeholder="Search for a show"
                style={{
                  maxWidth: "480px",
                  width: "100%"
                }}
                value={searchKeywords}
                onChange={handleSearchShows}
                onFocus={handleFocusSearch}
              />
            </div>
            <div className="card-list">
              {
                searchKeywords.length > 0
                  ? (
                    <WatchingCardGrid
                      title="Search results"
                      keyPrefix="search-result"
                      shows={getShowsByIds(searchResults.map((s) => s.item.imdbID))}
                      setSelectedShow={setSelectedShow}
                    />
                  )
                  : (
                    <>
                      <WatchingCardGrid
                        title="Recently watched"
                        keyPrefix="current"
                        shows={getShows(true)}
                        setSelectedShow={setSelectedShow}
                        filter={recentFilter}
                        viewMode={viewMode}
                        cornerActions={(
                          <Dropdown
                            options={[
                              { value: "all", label: "All" },
                              { value: "mustwatch", label: "Must Watch" }
                            ]}
                            selectedValue={recentFilter}
                            setSelectedValue={setRecentFilter}
                          />
                        )}
                      />
                      <WatchingCardGrid
                        title="Viewing history"
                        keyPrefix="recent"
                        shows={getShows()}
                        setSelectedShow={setSelectedShow}
                        filter={historyFilter}
                        viewMode={viewMode}
                        cornerActions={(
                          <Dropdown
                            options={[
                              { value: "all", label: "All" },
                              { value: "mustwatch", label: "Must Watch" }
                            ]}
                            selectedValue={historyFilter}
                            setSelectedValue={setHistoryFilter}
                          />
                        )}
                      />
                    </>
                  )
              }
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
