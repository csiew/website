import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MdMenu } from "react-icons/md";
import { useRouter } from "next/router";
import { PageRoute } from "../../../lib/@types";
import Button from "../../ui/Button";
import config from "../../../config";

const NavBar = ({ pages }: { pages: PageRoute[] }) => {
  const router = useRouter();
  const navMenuRef = useRef<any>(null);
  const [showNavToggle, setShowNavToggle] = useState<boolean>(true);
  const [showNavMenu, setShowNavMenu] = useState<boolean>(false);

  const closeNavMenu = () => {
    if (showNavToggle) {
      navMenuRef.current.style.pointerEvent = "none";
      navMenuRef.current.style.cursor = "not-allowed";
      setTimeout(() => setShowNavMenu(false), 250);
    }
  };

  useEffect(() => {
    const rootElWidth = document.getElementById(config.rootElementId)?.clientWidth || 0;
    if (rootElWidth >= 768) {
      setShowNavMenu(true);
      setShowNavToggle(false);
    }
  }, []);

  return (
    <header>
      <span className="titleAndMenuToggle">
        <h1>
          <Link href="/">
            Clarence Siew
          </Link>
        </h1>
        {
          showNavToggle
            ? (
              <Button className="navMenuToggle" callback={() => setShowNavMenu(!showNavMenu)}>
                <MdMenu />
              </Button>
            )
            : <></>
        }
      </span>
      {
        showNavMenu
          ? (
            <nav ref={navMenuRef}>
              {
                pages
                  .filter((page) => !page.hideFromNavBar)
                  .map((page) => (
                    <Link key={page.path.replace("/", "nav-link-")} href={page.path}>
                      <a className={["navLink", router.pathname === page.path ? "active" : ""].join(" ")} onClick={closeNavMenu}>
                        {page.title}
                      </a>
                    </Link>
                  ))
              }
            </nav>
          )
          : <></>
      }
    </header>
  );
};

export default NavBar;
