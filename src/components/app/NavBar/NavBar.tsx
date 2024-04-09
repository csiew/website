import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <header>
      <h1>
        <NavLink to="/">Clarence Siew</NavLink>
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
              to="/playlists"
              className={({ isActive }) => isActive ? "active" : "" }
            >
              Playlists
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
