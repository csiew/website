import React, { useEffect } from "react";
import NavigationView from "../components/ui/NavigationView";
import retitle from "../lib/retitle";

const Home = () => {
  useEffect(() => {
    document.title = retitle("Home");
    document.getElementById("root")?.scrollTo({ top: 0 });
  }, []);

  return (
    <NavigationView
      content={(
        <article className="topLevelPage pageHome">
          <section>
            <img className="profile" src="/profile.jpg" alt="Clarence's portrait" />
            <p>
              Hi there! I&apos;m <span className="highlight firstName">Clarence</span>. I&apos;m a <span className="highlight profession">software engineer</span> based in <span className="highlight location">Melbourne</span> who builds web applications, services, and websites.
            </p>
          </section>
          <section>
            <p>
              I was born in George Town on Penang Island, which is one half of the state of Penang in Malaysia.
            </p>
            <p>
              I currently live in Melbourne, Victoria in Australia. It was at one point, the most locked-down city in the world. Being a homebody, I wasn&apos;t too bothered.
            </p>
          </section>
          <section>
            <p>
              I absolutely must have music playing when working. My favourite genres are punk, grunge, alternative, hard rock and metal.
            </p>
          </section>
        </article>
      )}
    />
  );
};

export default Home;
