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
                <ul>
                  <a className="navigation-sidebar-item" key={keyName} href={item.url}>
                    {item.label}
                  </a>
                </ul>
              );
            } else {
              return (
                <ul>
                  <span className="navigation-sidebar-item" key={keyName} onClick={item.callback}>
                    {item.label}
                  </span>
                </ul>
              );
            }
          })
        }
      </ul>
    </nav>
  );
};

export default NavigationSidebar;
