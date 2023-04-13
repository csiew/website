import React from "react";
import Link from "next/link";
import config from "../../../config";

const Footer = () => {
  return (
    <footer>
      <p>
        <Link href={`/changelog?v=${config.version}`}>
          Version {config.version}
        </Link>
      </p>
      <p>
        &copy; 2023 Clarence Siew
      </p>
    </footer>
  );
};

export default Footer;
