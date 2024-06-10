import React from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import _ from "lodash";
import { CacheContextState } from "../../stores/cache";
import "./Feed.css";

export default function Feed() {
  const cacheContext = React.useContext(CacheContextState);
  
  return (
    <>
      <Helmet>
        <title>Feed | Clarence Siew</title>
        <meta name="title" property="og:title" content="Feed | Clarence Siew" />
        <meta name="url" property="og:url" content="https://www.clarencesiew.com/feed" />
        <meta name="site_name" property="og:site_name" content="Clarence Siew" />
        <meta name="description" property="og:description" content="Clarence's Mastodon feed" />
        <meta name="author" property="og:author" content="Clarence Siew" />
        <meta name="locale" property="og:locale" content="en_GB" />
      </Helmet>
      <h2>Feed</h2>
      {!cacheContext.feed.length
        ? <p>Loading...</p>
        : (
          <section className="feed-posts-list">
            <ul>
              {cacheContext.feed.map((p) => (
                <li key={p.guid[0]}>
                  <div dangerouslySetInnerHTML={{ __html: p.description[0] }}></div>
                  {_.has(p, "media:content") && !!p["media:content"].length && (
                    <div className="carousel">
                      {p["media:content"].filter((m: any) => m.$.medium === "image").map((m: any) => (
                        <div key={m.$.url} className="image-group">
                          <Link to={m.$.url}>
                            <img
                              src={m.$.url}
                              title={
                                _.has(m, "media:description.0._")
                                  ? m["media:description"][0]._
                                  : ""
                              }
                            />
                          </Link>
                          {_.has(m, "media:description.0._") && (
                            <span>{m["media:description"][0]._}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <div>
                    <sub className="timestamp">
                      <Link to={p.link[0]}>
                        {new Date(p.pubDate[0]).toLocaleDateString()}
                      </Link>
                    </sub>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )
      }
    </>
  );
}
