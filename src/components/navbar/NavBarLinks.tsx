import { NavLink } from "react-router-dom";

export default () => {
  return (
    <nav>
      <NavLink to="/" className={(state: any) => state.isActive ? "active" : ""}>
        Home
      </NavLink>
      <NavLink to="/about" className={(state: any) => state.isActive ? "active" : ""}>
        About
      </NavLink>
    </nav>
  );
};
