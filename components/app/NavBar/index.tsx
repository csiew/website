import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MdClose, MdMenu } from "react-icons/md";
import { useRouter } from "next/router";
import { PageRoute } from "../../../lib/@types";
import Button from "../../ui/Button";
import config from "../../../config";

const NavBar = ({ pages }: { pages: PageRoute[] }) => {
  const router = useRouter();
  const navMenuRef = useRef<any>(null);
  const isMounted = useRef<boolean>();
  const [showNavToggle, setShowNavToggle] = useState<boolean>(true);
  const [showNavMenu, setShowNavMenu] = useState<boolean>(false);

  const reconfigureNavLayout = (ev?: UIEvent) => {
    const rootElWidth = document.getElementById(config.rootElementId)?.clientWidth || 0;
    if (rootElWidth >= 900) {
      setShowNavMenu(true);
      setShowNavToggle(false);
    } else {
      setShowNavMenu(false);
      setShowNavToggle(true);
    }
  };

  const closeNavMenu = () => {
    if (showNavToggle && !!navMenuRef.current) {
      navMenuRef.current.style.pointerEvent = "none";
      navMenuRef.current.style.cursor = "not-allowed";
      setTimeout(() => setShowNavMenu(false), 250);
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      reconfigureNavLayout();
      window.addEventListener("resize", reconfigureNavLayout);
    } else {
      isMounted.current = true;
    }
  }, []);

  return (
    <header>
      <span className="titleAndMenuToggle">
        <h1 onClick={closeNavMenu}>
          <Link href="/">
            Clarence Siew
          </Link>
        </h1>
        {
          showNavToggle
            ? (
              <Button className="navMenuToggle" onClick={() => setShowNavMenu(!showNavMenu)}>
                {
                  showNavMenu
                    ? <MdClose />
                    : <MdMenu />
                }
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
                    <Link
                      key={page.path.replace("/", "nav-link-")}
                      className={["navLink", router.pathname === page.path ? "active" : ""].join(" ")}
                      href={page.path}
                      onClick={closeNavMenu}>
                      {page.title}
                    </Link>
                  ))
              }
              <a href="https://www.linkedin.com/in/clarencesiew/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://github.com/csiew" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </nav>
          )
          : <></>
      }
    </header>
  );
};

export default NavBar;
