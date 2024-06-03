import { Link } from "wouter";

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
        <Link to={props.url} onClick={props.onClick}>
          {props.title}
        </Link>
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
