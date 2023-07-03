import React from "react";
import { BsAt, BsGithub, BsInstagram, BsLinkedin, BsMastodon } from "react-icons/bs";

export default function Footer() {
  return (
    <footer>
      <div className="social-links">
        <a title="Email" href="mailto:clarence.siew@gmail.com" target="__blank">
          <BsAt />
        </a>
        <a title="LinkedIn" href="https://www.linkedin.com/in/clarencesiew/" target="__blank">
          <BsLinkedin />
        </a>
        <a title="Instagram" href="https://instagram.com/clarence_siew" target="__blank">
          <BsInstagram />
        </a>
        <a title="Mastodon" href="https://mastodon.online/@csiew" target="__blank">
          <BsMastodon />
        </a>
        <a title="GitHub" href="https://github.com/csiew" target="__blank">
          <BsGithub />
        </a>
      </div>
      <p>
        &copy; 2023 Clarence Siew
      </p>
    </footer>
  );
}
