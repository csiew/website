import React from "react";
import styles from "./page.module.css";
import Markdown from "../components/ui/Markdown/Markdown";

const content = `
In the web's vast sprawl,\n
404, my search does stall,\n
Lost, I click and bawl.
`;

export default function NotFound() {
  return (
    <main className={styles.notFoundMain}>
      <h2>Not found!</h2>
      <Markdown>
        {content}
      </Markdown>
    </main>
  );
}
