import { NavLink } from "react-router-dom";

export function List(props) {
  return (
    <div className={`list-selectable ${props.className ? props.className : ''}`}>
      {props.children}
    </div>
  );
}

export function ListItem(props) {
  if (props.to) {
    return (
      <NavLink
        title={props.title}
        className={`item ${props.selected ? 'active' : ''} ${props.className ? props.className : ''}`}
        to={props.to}
        exact={props.exact}
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
        className={`item ${props.className ? props.className : ''}`}
      >
        {props.children}
      </a>
    );
  } else {
    return (
      <div
        title={props.title}
        className={`item ${props.selected ? 'active' : ''} ${props.className ? props.className : ''}`}
        onClick={props.onClick}
      >
        {props.children}
      </div>
    );
  }
}
