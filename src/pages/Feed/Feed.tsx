import React from "react";
import { NavLink } from "react-router-dom";
import { parseStringPromise } from "xml2js";
import _ from "lodash";
import { CacheContextState } from "../../stores/cache";
import "./Feed.css";

export default function Feed() {
  const isMountedRef = React.useRef<boolean>(false);
  const cacheContext = React.useContext(CacheContextState);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [posts, setPosts] = React.useState<any[]>([]);

  async function handleFetchFeed() {
    try {
      if (cacheContext.feed.length) {
        setPosts(cacheContext.feed);
        return;
      }
      setIsLoading(true);
      const feedXmlResult = await fetch("https://mastodon.online/@csiew.rss");
      if (!feedXmlResult.ok)
        throw new Error(feedXmlResult.statusText);
      const feedXml = await feedXmlResult.text();
      const feedJson = await parseStringPromise(feedXml);
      const feedPosts = _.get(feedJson, "rss.channel[0].item");
      console.debug(feedPosts);
      setPosts(feedPosts);
      cacheContext.setFeed?.(feedPosts);
      setIsError(false);
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      handleFetchFeed();
    }
  }, []);
  
  return (
    <>
    {isError && <p>Failed to fetch feed. Try reloading this page.</p>}
    {isLoading && <p>Loading...</p>}
    {!isError && !isLoading && (
      <>
        <h2>Feed (<NavLink to="https://mastodon.online/@csiew">Mastodon</NavLink>)</h2>
        <section className="feed-posts-list">
          <ul>
            {posts.map((p) => (
              <li key={p.guid[0]}>
                <div dangerouslySetInnerHTML={{ __html: p.description[0] }}></div>
                {_.has(p, "media:content") && !!p["media:content"].length && (
                  <div className="carousel">
                    {p["media:content"].filter((m: any) => m.$.medium === "image").map((m: any) => (
                      <div key={m.$.url} className="image-group">
                        <NavLink to={m.$.url}>
                          <img
                            src={m.$.url}
                            title={
                              _.has(m, "media:description.0._")
                                ? m["media:description"][0]._
                                : ""
                            }
                          />
                        </NavLink>
                        {_.has(m, "media:description.0._") && (
                          <span>{m["media:description"][0]._}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <div>
                  <sub className="timestamp">
                    <NavLink to={p.link[0]}>
                      {new Date(p.pubDate[0]).toLocaleDateString()}
                    </NavLink>
                  </sub>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </>
    )}
    </>
  );
}
