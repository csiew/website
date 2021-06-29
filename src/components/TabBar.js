import { NavLink } from "react-router-dom";

export function TabBar(props) {
  return (
    <div className={`tab-bar ${props.className ? props.className : ''}`}>
      {props.children}
    </div>
  );
}

export function TabBarItem(props) {
  if (props.to) {
    return (
      <NavLink
        title={props.title}
        to={props.to}
        exact={props.exact}
        className={`item text-align-center cursor-pointer noselect ${props.className ? props.className : ''}`}
      >
        {props.children}
      </NavLink>
    );
  } else if (props.href) {
    return (
      <a
        title={props.title}
        href={props.href}
        target={props.openInNewTab ? '_blank' : ''}
        rel="noreferrer"
        className={`item text-align-center cursor-pointer noselect ${props.className ? props.className : ''}`}
      >
        {props.children}
      </a>
    );
  } else {
    return (
      <div
        title={props.title}
        className={`item text-align-center cursor-pointer noselect ${props.className ? props.className : ''}`}
        onClick={props.onClick}
      >
        {props.children}
      </div>
    );
  }
}

export function TabBarStickyContainer(props) {
  let positionedClasses = "";
  switch (props.anchor) {
    case "bottom":
      positionedClasses = "card-border-bottom-radius border-top anchor-bottom margin-none-bottom";
      break;
    case "top":
    default:
      positionedClasses = "card-border-top-radius border-bottom anchor-top margin-none-top";
  }
  return (
    <div
      className={`bg-color-acryllic position-sticky padding-s ${positionedClasses} ${props.className ? props.className : ''}`}
    >
      {props.children}
    </div>
  );
}
