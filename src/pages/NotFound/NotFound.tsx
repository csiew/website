import { NavLink } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <>
      <h2>Not Found</h2>
      <img
        src="/not-found.png"
        className="not-found"
        onContextMenu={(e) => e.preventDefault()}
      />
      <NavLink to="/" className="button not-found-redirect">
        Back to homepage
      </NavLink>
    </>
  );
}
