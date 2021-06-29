export function Toolbar(props) {
  return (
    <div className={`toolbar anchor-top margin-none-top padding-none ${props.className ? props.className : ''}`}>
      {props.children}
    </div>
  );
}
