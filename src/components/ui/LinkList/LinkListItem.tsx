import { NavLink } from "react-router-dom";

type LinkListItemProps = {
  title: string;
  url: string;
  subtitle?: string;
  timestamp?: string;
  onClick?: () => Promise<void>;
};

export default function LinkListItem(props: LinkListItemProps) {
  return (
    <article>
      <h3>
        <NavLink end to={props.url} onClick={props.onClick}>
          {props.title}
        </NavLink>
      </h3>
      {props.subtitle && (
        <p className="subtitle">{props.subtitle}</p>
      )}
      {props.timestamp && (
        <sub className="timestamp">{props.timestamp}</sub>
      )}
    </article>
  );
}
