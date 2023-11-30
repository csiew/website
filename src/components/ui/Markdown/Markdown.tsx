"use client";

import React, { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import HTMLReactParser from "html-react-parser";

export default function Markdown({ children }: { children: string }) {
  const isMountedRef = useRef<boolean>(false);
  const [mdHtml, setMdHtml] = useState<string>("");

  async function setValue() {
    setMdHtml(await marked.parse(children));
  }

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      setValue();
    }
  }, []);

  return <>{HTMLReactParser(mdHtml)}</>;
}
