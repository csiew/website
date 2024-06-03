import React from "react";
import { Link, useLocation } from "wouter";
import LoadingIndicator from "../CacheLoadingIndicator/CacheLoadingIndicator";
import "./NavBar.css";

export default function NavBar() {
  const [location] = useLocation();

  return (
    <>
      <LoadingIndicator />
      <header>
        <h1>
          <Link to="/">
            <span className="profile-photo"></span>
            <span className="site-title">Clarence Siew</span>
          </Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link
                to="/"
                className={location === "/" ? "active" : ""}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/feed"
                className={location === "/feed" ? "active" : ""}
              >
                Feed
              </Link>
            </li>
            <li>
              <Link
                to="/posts"
                className={location === "/posts" || location.startsWith("/posts/") ? "active" : ""}
              >
                Posts
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className={location === "/projects" || location.startsWith("/projects/") ? "active" : ""}
              >
                Projects
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
