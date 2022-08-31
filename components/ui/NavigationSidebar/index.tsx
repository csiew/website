import React, { ReactElement } from "react";
import { BaseComponentProps } from "../../../lib/@types";

type NavigationSidebarProps = BaseComponentProps & {
  keyPrefix: string;
  items: Array<{
    key: string;
    label: string | ReactElement | ReactElement[];
    active?: boolean;
    url?: string;
    callback?: () => void;
  }>;
};

const NavigationSidebar = ({
  classList, className, disabled, style, keyPrefix, items
}: NavigationSidebarProps) => {
  return (
    <nav
      className={["navigationSidebar", disabled ? "disabled" : undefined, className, ...classList || []].join(" ")}
      style={style}
    >
      <ul>
        {
          items.map((item) => {
            const keyName = `${keyPrefix}-${item.key}`;
            const classNames = ["navigationSidebarItem", item.active ? "active" : ""].join(" ");
            if (item.url) {
              return (
                <li key={keyName} className={classNames}>
                  <a href={item.url}>
                    {item.label}
                  </a>
                </li>
              );
            } else {
              return (
                <li key={keyName} className={classNames}>
                  <span onClick={item.callback}>
                    {item.label}
                  </span>
                </li>
              );
            }
          })
        }
      </ul>
    </nav>
  );
};

export default NavigationSidebar;
