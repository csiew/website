import { PlainButtonProps } from "./@types";

const PlainButton = ({ classList, className, style, children, callback, disabled }: PlainButtonProps) => {
  return (
    <button
      className={[disabled ? "disabled" : undefined, className, ...classList || []].join(" ")}
      style={style}
      onClick={callback}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PlainButton;
