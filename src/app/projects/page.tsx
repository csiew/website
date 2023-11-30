"use client";

import React from "react";
import styles from "./page.module.css";
import Projects from "../../sections/Projects/Projects";

export default function ProjectsPage() {
  return (
    <main className={styles.main}>
      <Projects isListView={true} />
    </main>
  );
}
