import { BaseComponentProps } from "../../../common/@types";

type PageNavSidebarProps = BaseComponentProps & {
  keyPrefix: string;
  items: Array<{
    key: string;
    label: string;
    url?: string;
    callback?: () => void;
  }>;
};

const PageNavSidebar = ({
  classList, className, disabled, style, keyPrefix, items
}: PageNavSidebarProps) => {
  return (
    <nav
      className={["page-nav-sidebar", disabled ? "disabled" : undefined, className, ...classList || []].join(" ")}
      style={style}
    >
      {
        items.map((item) => {
          const keyName = `${keyPrefix}-${item.key}`;
          if (item.url) {
            return (
              <a className="page-nav-sidebar-item" key={keyName} href={item.url}>
                {item.label}
              </a>
            );
          } else {
            return (
              <span className="page-nav-sidebar-item" key={keyName} onClick={item.callback}>
                {item.label}
              </span>
            );
          }
        })
      }
    </nav>
  );
};

export default PageNavSidebar;
