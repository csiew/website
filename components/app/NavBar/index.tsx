import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import routes from "../../../lib/routes";
import { PageRoute } from "../../../lib/@types";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { MdMenu } from "react-icons/md";

const NavBar = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const getRoutes = () => {
    return routes.filter((route) => !route.hideFromNavBar);
  };

  return (
    <>
      <header>
        <Link href="/" id="site-home-link">
          <span style={{ display: "inline-flex", flexFlow: "row", alignItems: "center", justifyContent: "flex-start", gap: "0.75rem" }}>
            <img src="/profile.jpg" style={{ width: "2rem", height: "2rem", borderRadius: "100%" }} />
            <h1>Clarence Siew</h1>
          </span>
        </Link>
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
        <Button id="overlay-menu-btn" onClick={() => setShowMenu(true)} iconOnly>
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
