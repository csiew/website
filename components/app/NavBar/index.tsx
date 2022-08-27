import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { PageRoute } from "../../../lib/@types";

const NavBar = ({ pages }: { pages: PageRoute[] }) => {
  const router = useRouter();

  return (
    <header>
      <h1>
        <Link href="/">
          Clarence Siew
        </Link>
      </h1>
      <nav>
        {
          pages
            .filter((page) => !page.hideFromNavBar)
            .map((page) => (
              <Link key={page.path.replace("/", "nav-link-")} href={page.path}>
                <a className={router.pathname === page.path ? "active" : ""}>{page.title}</a>
              </Link>
            ))
        }
      </nav>
    </header>
  );
};

export default NavBar;
