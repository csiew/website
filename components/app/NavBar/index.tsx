import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsGithub, BsInstagram, BsLinkedin, BsMastodon } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import routes from "../../../lib/routes";
import { PageRoute } from "../../../lib/@types";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

function SocialLinks() {
  return (
    <div className="social-links">
      <a title="LinkedIn" href="https://www.linkedin.com/in/clarencesiew/" target="__blank">
        <BsLinkedin />
      </a>
      <a title="Instagram" href="https://instagram.com/clarence_siew" target="__blank">
        <BsInstagram />
      </a>
      <a title="Mastodon" href="https://mastodon.online/@csiew" target="__blank">
        <BsMastodon />
      </a>
      <a title="GitHub" href="https://github.com/csiew" target="__blank">
        <BsGithub />
      </a>
    </div>
  );
}

export default function NavBar() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const getRoutes = () => {
    return routes.filter((route) => !route.hideFromNavBar);
  };

  return (
    <>
      <header>
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
            <img src="/cartoon-profile.jpg" />
          </Link>
          <Button
            id="overlay-menu-btn"
            iconOnly
            alt="Navigation menu"
            style={{
              margin: 0,
              padding: "0.25rem",
              border: "none",
              borderRadius: "100%"
            }}
            onClick={() => setShowMenu(true)}
          >
            <MdMenu />
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
          <SocialLinks />
        </nav>
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
                <SocialLinks />
              </nav>
            </Modal>
          )
          : <></>
      }
    </>
  );
}
