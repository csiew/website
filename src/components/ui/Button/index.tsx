import Button from "./PlainButton";
import LinkButton from "./LinkButton";
import "./index.css";
import { PlainButtonProps, LinkButtonProps } from "./@types";

const ButtonProxy = (props: PlainButtonProps & LinkButtonProps) => {
  const keys = Object.keys(props);
  if (["url", "newTab"].some((k) => keys.includes(k))) {
    return <LinkButton {...props} />;
  }
  return <Button {...props} />;
};

export default ButtonProxy;
