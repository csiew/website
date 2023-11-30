import { useState, useEffect } from "react";
import { useInterval } from "usehooks-ts";
import config from "../../config";
import Card from "../../components/ui/Card/Card";
import Markdown from "../../components/ui/Markdown/Markdown";

const greetings = [
  "Howdy!",
  "Howdy stranger!",
  "Hi there, stranger.",
  "Hi there, visitor.",
  "Greetings.",
  "Aloha!",
  "Hola!",
  "Welcome!",
  "Oh hey, didn't see you there!"
];

const content = `
I'm a full-stack software engineer based in Melbourne. Coding isn't just a job for me, it's been a passion of mine since I was 9 years old and it's been my primary hobby ever since.

I also love reading about history (ancient civilisations, culinary history, architecture and urban planning, etc) and scouring Spotify &amp; YouTube for new music.

I mostly develop in TypeScript and JavaScript for both backend services and frontend/websites. I've used a plethora frontend frameworks/libraries such as React (including Next.js), Vue.js, and Svelte (including SvelteKit) for work and personal projects. I also have experience developing in Java and Kotlin with Spring for backend services. I also use Shell and Python scripts from time to time for some DevOps or quick data processing.

I also actively use Amazon Web Services at work. For personal projects I largely use Netlify for CI/CD and hosting, with some experimenting with edge functions. I've also experimented with Google Firebase, Supabase, and PlanetScale for personal projects for both SQL and NoSQL database hosting.
`;

export default function About() {
  const [greetingIndex, setGreetingIndex] = useState<number>();

  useEffect(() => {
    setGreetingIndex(Math.floor(Math.random() * greetings.length));
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);

  useInterval(() => {
    setGreetingIndex(Math.floor(Math.random() * greetings.length));
  }, 1000);
  
  return (
    <Card>
      <h2>About</h2>
      <p>
        {greetingIndex ? greetings[greetingIndex] : "Hello."}
      </p>
      <Markdown>
        {content}
      </Markdown>
    </Card>
  );
}
