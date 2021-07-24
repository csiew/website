import { NavLink } from "react-router-dom";
import packageJson from "../../package.json";

function Footer() {

  return (
    <footer>
      <p className="font-weight-600">
        <NavLink to="/changelog">Version {packageJson.version}</NavLink>
      </p>
      <p>
        This site was built using React and is hosted on Netlify.
      </p>
      <p>
        &copy; 2021 Clarence Siew
      </p>
    </footer>
  )
}

export default Footer;
