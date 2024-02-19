"use client";

import React from "react";
import styles from "./page.module.css";
import About from "../sections/About/About";
import Socials from "../sections/Socials/Socials";

export default function Home() {
  return (
    <main className={styles.main}>
      <About />
      <Socials />
    </main>
  );
}
