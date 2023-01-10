import { ReactElement } from "react";

export type PageRoute = {
  title: string;
  path: string;
  hideFromNavBar?: boolean;
};

export type BaseComponentProps = {
  id?: string;
  classList?: string[];
  className?: string;
  disabled?: boolean;
  style?: { [k: string]: string | number };
};

export type ComposableComponentProps = BaseComponentProps & {
  children?: ReactElement | ReactElement[];
};

export type CommitAttemptFlags = {
  delete: boolean;
  publish: boolean;
  unpublish: boolean;
};
