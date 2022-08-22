import { useEffect } from "react";

export default () => {
  useEffect(() => {
    document.title = "About | Clarence Siew";
  }, []);

  return (
    <>
      <h2>About</h2>
      <p>Hello World!</p>
    </>
  );
};
