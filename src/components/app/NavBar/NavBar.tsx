"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import _ from "lodash";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const pathName = usePathname();

  function linkActiveState(url: string) {
    return pathName === url ? styles.active : "";
  }

  return (
    <header className={styles.header}>
      <div className={styles.siteTitleBar}>
        <Link href="/">
          <img src="/profile.jpg" />
          <h1>Clarence Siew</h1>
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/" className={linkActiveState("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/posts" className={linkActiveState("/posts")}>
              Posts
            </Link>
          </li>
          <li>
            <Link href="/projects" className={linkActiveState("/projects")}>
              Projects
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
