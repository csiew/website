import React from "react";
import { NavLink } from "react-router-dom";
import { CacheContextState } from "../../../stores/cache";
import "./NavBar.css";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

export default function NavBar() {
  const cacheContext = React.useContext(CacheContextState);

  return (
    <>
      {cacheContext.isLoading && (<LoadingIndicator />)}
      <header>
        <h1>
        <NavLink to="/">
          <span className="profile-photo"></span>
          <span className="site-title">Clarence Siew</span>
        </NavLink>
        </h1>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? "active" : "" }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/feed"
                className={({ isActive }) => isActive ? "active" : "" }
              >
                Feed
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/posts"
                className={({ isActive }) => isActive ? "active" : "" }
              >
                Posts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                className={({ isActive }) => isActive ? "active" : "" }
              >
                Projects
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
