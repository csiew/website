import React from "react";
import styles from "./page.module.css";
import Playlists from "../../sections/Playlists/Playlists";

export default function PlaylistsPage() {
  return (
    <main className={styles.main}>
      <Playlists />
    </main>
  );
}
