import { BaseComponentProps } from "../../../common/@types";

type NavigationSidebarProps = BaseComponentProps & {
  keyPrefix: string;
  items: Array<{
    key: string;
    label: string;
    url?: string;
    callback?: () => void;
  }>;
};

const NavigationSidebar = ({
  classList, className, disabled, style, keyPrefix, items
}: NavigationSidebarProps) => {
  return (
    <nav
      className={["navigation-sidebar", disabled ? "disabled" : undefined, className, ...classList || []].join(" ")}
      style={style}
    >
      <ul>
        {
          items.map((item) => {
            const keyName = `${keyPrefix}-${item.key}`;
            if (item.url) {
              return (
                <li className="navigation-sidebar-item">
                  <a key={keyName} href={item.url}>
                    {item.label}
                  </a>
                </li>
              );
            } else {
              return (
                <li className="navigation-sidebar-item">
                  <span key={keyName} onClick={item.callback}>
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
