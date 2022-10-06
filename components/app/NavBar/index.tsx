import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MdClose, MdCode, MdCreate, MdHelpOutline, MdMenu, MdPlaylistPlay, MdTv } from "react-icons/md";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
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
    if (rootElWidth > 767) {
      setShowNavMenu(true);
      setShowNavToggle(false);
    } else {
      setShowNavMenu(false);
      setShowNavToggle(true);
    }
  };

  const closeNavMenu = () => {
    if (showNavToggle) {
      navMenuRef.current.style.pointerEvent = "none";
      navMenuRef.current.style.cursor = "not-allowed";
      setTimeout(() => setShowNavMenu(false), 250);
    }
  };

  const getLinkIcon = (path: string) => {
    switch (path) {
    case "/blog":
      return <MdCreate />;
    case "/projects":
      return <MdCode />;
    case "/playlists":
      return <MdPlaylistPlay />;
    case "/now-watching":
      return <MdTv />;
    default:
      return <MdHelpOutline />;
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
        <h1>
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
                    <Link key={page.path.replace("/", "nav-link-")} href={page.path}>
                      <a className={["navLink", router.pathname === page.path ? "active" : ""].join(" ")} onClick={closeNavMenu}>
                        <span className="icon">{getLinkIcon(page.path)}</span>
                        <span className="title">{page.title}</span>
                      </a>
                    </Link>
                  ))
              }
              <hr />
              <a href="https://twitter.com/clarence_siew" target="_blank" rel="noreferrer">
                <span className="icon"><FaTwitter /></span>
                <span className="title">Twitter</span>
              </a>
              <a href="https://www.linkedin.com/in/clarencesiew/" target="_blank" rel="noreferrer">
                <span className="icon"><FaLinkedin /></span>
                <span className="title">LinkedIn</span>
              </a>
              <a href="https://github.com/csiew" target="_blank" rel="noreferrer">
                <span className="icon"><FaGithub /></span>
                <span className="title">GitHub</span>
              </a>
            </nav>
          )
          : <></>
      }
    </header>
  );
};

export default NavBar;
