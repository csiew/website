import { useEffect } from "react";
import retitle from "../../lib/retitle";

const About = () => {
  useEffect(() => {
    document.title = retitle("About");
  }, []);

  return (
    <article className="top-level-page">
      <h2>About</h2>
      <p>Hello World!</p>
    </article>
  );
};

export default About;
