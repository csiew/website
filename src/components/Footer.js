import { NavLink } from "react-router-dom";

function Footer() {

  return (
    <footer>
      <p className="font-weight-600">
        <NavLink to="/changelog">Version 3.2.1</NavLink>
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
