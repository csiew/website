"use client";

import React from "react";
import Link from "next/link";
import _ from "lodash";
import styles from "./NavBar.module.css";

export default function NavBar() {

  return (
    <header className={styles.header}>
      <div className={styles.siteTitleBar}>
        <Link href="/">
          <img src="/profile.jpg" />
          <h1>Clarence Siew</h1>
        </Link>
      </div>
    </header>
  );
}
