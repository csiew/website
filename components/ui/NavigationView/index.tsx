import React, { ReactElement } from "react";
import { BaseComponentProps } from "../../../lib/@types";

type NavigationViewProps = BaseComponentProps & {
  nav?: string | ReactElement | ReactElement[];
  navPosition?: "left" | "right";
  content?: string | ReactElement | ReactElement[];
};

const NavigationView = ({ nav, navPosition, content, classList, className, style, disabled }: NavigationViewProps) => {
  return (
    <div
      className={["navigationView", navPosition === "right" ? "rightNav" : "leftNav", disabled ? "disabled" : undefined, className, ...classList || []].join(" ")}
      style={style}
    >
      {
        nav ?
          <div className="navigationViewNav">
            {nav}
          </div>
          :
          <></>
      }
      <div className="navigationViewContent">
        {content}
      </div>
    </div>
  );
};

export default NavigationView;
