import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
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
