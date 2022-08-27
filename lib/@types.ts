export type PageRoute = {
  title: string;
  path: string;
  hideFromNavBar?: boolean;
};

export type BaseComponentProps = {
  classList?: string[];
  className?: string;
  disabled?: boolean;
  style?: { [k: string]: string | number };
};
