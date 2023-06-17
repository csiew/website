import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import routes from "../../../lib/routes";
import { PageRoute } from "../../../lib/@types";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { MdMenu, MdSearch } from "react-icons/md";
import config from "../../../config";

const NavBar = ({ setShowSearchModal }: { setShowSearchModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const router = useRouter();
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const getRoutes = () => {
    return routes.filter((route) => !route.hideFromNavBar);
  };

  const handleScrollEvent = () => {
    const rootEl = document.getElementById(config.rootElementId);
    setIsAtTop(rootEl?.scrollTop === 0);
  };

  useEffect(() => {
    const rootEl = document.getElementById(config.rootElementId);
    rootEl?.addEventListener("scroll", handleScrollEvent);
    window.addEventListener("keydown", (ev: KeyboardEvent) => {
      if (ev.key === "/") {
        ev.preventDefault();
        setShowSearchModal(true);
      }
    });
  }, []);

  return (
    <>
      <header className={!isAtTop ? "with-shadow" : ""}>
        <div className="site-home-link">
          <Link href="/" style={{
            margin: 0,
            padding: 0,
            display: "inline-flex",
            flexFlow: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 0
          }}>
            <img src="/profile_transparent_background.png" />
          </Link>
          <Button
            iconOnly
            id="search-button"
            alt="Search this site"
            style={{
              margin: 0,
              padding: "0.5rem",
              border: "none",
              borderRadius: "100%"
            }}
            onClick={() => setShowSearchModal(true)}>
            <MdSearch />
          </Button>
        </div>
        <nav className="navbar-menu">
          <ul>
            {
              getRoutes().map((route: PageRoute) => {
                return (
                  <li
                    key={route.path}
                    className={router.pathname === route.path ? "active" : ""}>
                    <Link href={route.path}>{route.title}</Link>
                  </li>
                );
              })
            }
          </ul>
        </nav>
        <Button
          id="overlay-menu-btn"
          iconOnly
          alt="Navigation menu"
          style={{
            margin: 0,
            padding: "0.5rem",
            border: "none",
            borderRadius: "100%"
          }}
          onClick={() => setShowMenu(true)}
        >
          <MdMenu />
        </Button>
      </header>
      {
        showMenu
          ? (
            <Modal closeWindowCallback={() => setShowMenu(false)}>
              <nav className="overlay-menu">
                <ul>
                  {
                    getRoutes().map((route: PageRoute) => {
                      return (
                        <li
                          key={route.path}
                          className={router.pathname === route.path ? "active" : ""}
                          onClick={() => setShowMenu(false)}>
                          <Link href={route.path}>{route.title}</Link>
                        </li>
                      );
                    })
                  }
                </ul>
              </nav>
            </Modal>
          )
          : <></>
      }
    </>
  );
};

export default NavBar;
