import { useEffect } from "react";
import Paper from "../components/paper";

export default () => {
  useEffect(() => {
    document.title = "Home | Clarence Siew";
  }, []);

  return (
    <Paper style={{ width: "100%" }}>
      <article>
        <section>
          <p>
						Hi there! I'm Clarence. I'm a software engineer based in Melbourne. I graduated with a Bachelor of Software Engineering from Monash University in 2020.
					</p>
          <p>
						I mostly work on web applications and websites as a full-stack engineer. I also have an interest in Linux, and graphic design.
					</p>
        </section>
        <section>
          <p>
						I was born in George Town on Penang Island, which is one half of the state of Penang in Malaysia.
					</p>
          <p>
						I currently live in Melbourne, Victoria in Australia. It was at one point, the most locked-down city in the world. Being a homebody, I wasn't too bothered.
					</p>
        </section>
        <section>
          <p>
            I absolutely must have music playing when working. My favourite genres are punk, grunge, alternative, hard rock and metal.
          </p>
        </section>
      </article>
    </Paper>
  );
};
