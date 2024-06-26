import React from "react";
import { Link } from "wouter";
import "./PersonalLinks.css";

const links = [
  {
    title: "LinkedIn",
    url: "https://linkedin.com/in/clarencesiew"
  },
  {
    title: "GitHub",
    url: "https://github.com/csiew"
  },
  {
    title: "Mastodon",
    url: "https://mastodon.online/@csiew"
  },
  {
    title: "Instagram",
    url: "https://instagram.com/clarence_siew"
  }
];

export default function PersonalLinks() {
  return (
    <div className="personal-links">
      <ul>
        {links.map((l) => (
          <li key={l.url}>
            <Link to={l.url} target="_blank">
              {l.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
