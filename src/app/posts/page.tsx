"use client";

import React from "react";
import styles from "./page.module.css";
import Posts from "../../sections/Posts/Posts";

export default function PostsPage() {
  return (
    <main className={styles.main}>
      <Posts isListView={true} />
    </main>
  );
}
