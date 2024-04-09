import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <p>Page not found</p>
      <p><NavLink to="/">Back to homepage</NavLink></p>
    </>
  );
}
