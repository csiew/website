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
        <h1>
          <a href="/">Clarence Siew</a>
        </h1>
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
