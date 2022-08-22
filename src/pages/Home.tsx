import { useEffect } from "react";
import Paper from "../components/paper";

export default () => {
  useEffect(() => {
    document.title = "Home | Clarence Siew";
  }, []);

  return (
    <Paper style={{ width: "100%" }}>
      <h2>Home</h2>
      <p>Hello World!</p>
    </Paper>
  );
};
