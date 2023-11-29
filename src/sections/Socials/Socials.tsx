import React from "react";
import Link from "next/link";
import { BsGithub, BsInstagram, BsLinkedin, BsMastodon } from "react-icons/bs";
import styles from "./Socials.module.css";
import Card from "../../components/ui/Card/Card";

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/clarencesiew/",
    icon: <BsLinkedin />
  },
  {
    name: "Instagram",
    url: "https://instagram.com/clarence_siew",
    icon: <BsInstagram />
  },
  {
    name: "Mastodon",
    url: "https://mastodon.online/@csiew",
    icon: <BsMastodon />
  },
  {
    name: "GitHub",
    url: "https://github.com/csiew",
    icon: <BsGithub />
  }
];

export default function Socials() {
  return (
    <Card>
      <h2>Socials</h2>
      <div className={styles.socialLinksGrid}>
        <ul>
          {socialLinks.map((sl) => (
            <li key={sl.name}>
              <Link
                href={sl.url}
                title={sl.name}
                className={styles.socialLink}
                target="_blank"
              >
                {sl.icon}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
