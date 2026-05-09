import React from "react";
import { AtSign, BriefcaseBusiness, Camera, Cloud, GitBranch, MessageCircle } from "lucide-react";
import "./LinkGrid.css";

const links = [
  {
    title: "LinkedIn",
    url: "https://linkedin.com/in/clarencesiew",
    icon: <BriefcaseBusiness />,
    newTab: true
  },
  {
    title: "GitHub",
    url: "https://github.com/csiew",
    icon: <GitBranch />,
    newTab: true
  },
  {
    title: "Mastodon",
    url: "https://mastodon.online/@csiew",
    icon: <MessageCircle />,
    newTab: true
  },
  {
    title: "Bluesky",
    url: "https://bsky.app/profile/csiew.bsky.social",
    icon: <Cloud />,
    newTab: true
  },
  {
    title: "Threads",
    url: "https://threads.net/@clarence_siew",
    icon: <AtSign />,
    newTab: true
  },
  {
    title: "Instagram",
    url: "https://instagram.com/clarence_siew",
    icon: <Camera />,
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
