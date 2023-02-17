import { ReactElement } from "react";

export type PageRoute = {
  title: string;
  path: string;
  hideFromNavBar?: boolean;
  authOnly?: boolean;
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

export type PublishableItem = {
  id?: string;
  isPublished?: boolean;
  publishedOn?: string | Date;
  [k: string]: any;
};
