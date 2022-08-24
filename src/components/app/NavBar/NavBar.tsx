import { NavLink } from "react-router-dom";
import { PageRoute } from "../../../common/@types";
import NavBarLinks from "./NavBarLinks";

const NavBar = ({ pages }: { pages: PageRoute[] }) => {
  return (
    <header>
      <h1>
        <NavLink to="/">
          Clarence Siew
        </NavLink>
      </h1>
      <NavBarLinks pages={pages} />
    </header>
  );
};

export default NavBar;
