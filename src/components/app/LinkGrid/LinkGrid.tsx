import React from "react";
import { SiBluesky, SiGithub, SiInstagram, SiLinkedin, SiMastodon, SiPixelfed, SiSpotify, SiThreads } from "react-icons/si";
import "./LinkGrid.css";

const links = [
  {
    title: "LinkedIn",
    url: "https://linkedin.com/in/clarencesiew",
    icon: <SiLinkedin />,
    newTab: true
  },
  {
    title: "GitHub",
    url: "https://github.com/csiew",
    icon: <SiGithub />,
    newTab: true
  },
  {
    title: "Mastodon",
    url: "https://mastodon.online/@csiew",
    icon: <SiMastodon />,
    newTab: true
  },
  {
    title: "Bluesky",
    url: "https://bsky.app/profile/csiew.bsky.social",
    icon: <SiBluesky />,
    newTab: true
  },
  {
    title: "Threads",
    url: "https://threads.net/@clarence_siew",
    icon: <SiThreads />,
    newTab: true
  },
  {
    title: "Instagram",
    url: "https://instagram.com/clarence_siew",
    icon: <SiInstagram />,
    newTab: true
  },
  {
    title: "Pixelfed",
    url: "https://pixelfed.social/i/web/profile/787269058851499264",
    icon: <SiPixelfed />,
    newTab: true
  },
  {
    title: "Spotify",
    url: "https://open.spotify.com/user/csiew",
    icon: <SiSpotify />,
    newTab: true
  }
];

function LinkGrid() {
  return (
    <div className="link-grid">
      <ul>
        {links.map((link) => (
          <li key={link.url}>
            <a href={link.url} target="_blank" rel="noreferrer">
              {link.icon}
              <span>{link.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(LinkGrid);
