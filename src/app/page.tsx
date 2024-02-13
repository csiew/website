"use client";

import React from "react";
import styles from "./page.module.css";
import About from "../sections/About/About";
import Projects from "../sections/Projects/Projects";
import Playlists from "../sections/Playlists/Playlists";
import Socials from "../sections/Socials/Socials";
import Posts from "../sections/Posts/Posts";

export default function Home() {
  return (
    <main className={styles.main}>
      <About />
      <Projects />
      <Posts />
      <Playlists />
      <Socials />
    </main>
  );
}
