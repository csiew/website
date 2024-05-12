import React from "react";
import { NavLink } from "react-router-dom";
import LoadingIndicator from "../CacheLoadingIndicator/CacheLoadingIndicator";
import "./NavBar.css";

export default function NavBar() {
  return (
    <>
      <LoadingIndicator />
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
