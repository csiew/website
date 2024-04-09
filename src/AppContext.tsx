import React from "react";
import { CacheContextState } from "./stores/cache";

export default function AppContext(props: React.ComponentPropsWithRef<any>) {
  const [feed, setFeed] = React.useState<any[]>([]);
  const [posts, setPosts] = React.useState<any[]>([]);

  return (
    <CacheContextState.Provider value={{ feed, setFeed, posts, setPosts }}>
      {props.children}
    </CacheContextState.Provider>
  );
}
