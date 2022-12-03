import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import routes from "../../../lib/routes";
import { PageRoute } from "../../../lib/@types";
import Button from "../../ui/Button";

const BackToHome = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [menuCoordinates, setMenuCoordinates] = useState<[number, number]>([0, 0]);

  return (
    <>
      <div className="backToHome">
        <div
          className={["backToHomeBubble", showMenu ? "backToHomeBubbleActive" : ""].join(" ")}
          onClick={(ev: any) => {
            const newState = !showMenu;
            setShowMenu(newState);
            if (newState) {
              const coords = ev.target.getBoundingClientRect() ?? {};
              setMenuCoordinates([coords.left, coords.top + coords.height + 8]);
            }
          }}>
          <img src="/profile.jpg" />
        </div>
      </div>
      {
        showMenu
          ? (
            <div className="floatNavMenu" style={{ left: `${menuCoordinates[0]}px`, top: `${menuCoordinates[1]}px` }}>
              <ul>
                {
                  routes
                    .filter((route) => !route.hideFromNavBar)
                    .map((route: PageRoute) => {
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
              <Button variant="reset" className="floatNavMenuClose" onClick={() => setShowMenu(false)}>
                Close
              </Button>
            </div>
          )
          : <></>
      }
    </>
  );
};

export default BackToHome;
