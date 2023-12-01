import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        <Link href="/sitemap">
          Sitemap
        </Link>
      </p>
      <p>
        &copy; 2023 Clarence Siew
      </p>
    </footer>
  );
}
