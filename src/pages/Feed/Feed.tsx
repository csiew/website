import React from "react";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { CacheContextState } from "../../stores/cache";
import "./Feed.css";

export default function Feed() {
  const cacheContext = React.useContext(CacheContextState);
  
  return (
    <>
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
        )
      }
    </>
  );
}
