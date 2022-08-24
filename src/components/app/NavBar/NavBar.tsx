import { PageRoute } from "../../../common/@types";
import NavBarLinks from "./NavBarLinks";

const NavBar = ({ pages }: { pages: PageRoute[] }) => {
  return (
    <header>
      <h1>Clarence Siew</h1>
      <NavBarLinks pages={pages} />
    </header>
  );
};

export default NavBar;
