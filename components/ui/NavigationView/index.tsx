import React, { ReactElement } from "react";
import { BaseComponentProps } from "../../../lib/@types";

type NavigationViewProps = BaseComponentProps & {
  nav?: string | ReactElement | ReactElement[];
  navPosition?: "left" | "right";
  navStyle?: any;
  content?: string | ReactElement | ReactElement[];
  contentStyle?: any;
};

const NavigationView = ({ nav, navPosition, navStyle, content, contentStyle, classList, className, style, disabled }: NavigationViewProps) => {
  return (
    <div
      className={["navigationView", navPosition === "right" ? "rightNav" : "leftNav", disabled ? "disabled" : undefined, className, ...classList || []].join(" ")}
      style={style}
    >
      {
        nav ?
          <div className="navigationViewNav" style={navStyle}>
            {nav}
          </div>
          :
          <></>
      }
      <div className="navigationViewContent" style={contentStyle}>
        {content}
      </div>
    </div>
  );
};

export default NavigationView;
