import { NavLink } from "react-router-dom";
import { PageRoute } from "../../../common/@types";

const NavBarLinks = ({ pages }: { pages: PageRoute[] }) => {
  return (
    <nav>
      {
        pages
          .filter((page) => !page.hideFromNavBar)
          .map((page) => {
            return (
              <NavLink key={page.path.replace("/", "nav-link-")} to={page.path} className={(state: { isActive: boolean }) => state.isActive ? "active" : ""}>
                {page.title}
              </NavLink>
            );
          })
      }
    </nav>
  );
};

export default NavBarLinks;
