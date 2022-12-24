import React from "react";
import config from "../../../config";

const Footer = () => {
  return (
    <footer>
      <p>
        Version {config.version}
      </p>
      <p>
        &copy; 2023 Clarence Siew
      </p>
    </footer>
  );
};

export default Footer;
