"use client";

import React, { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import HTMLReactParser from "html-react-parser";

export default function Markdown({ children }: { children?: string }) {
  const isMountedRef = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [mdHtml, setMdHtml] = useState<string>("");

  async function setValue(v: string) {
    try {
      setMdHtml(await marked.parse(v));
      setIsError(false);
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!isMountedRef.current && children?.length) {
      setIsLoading(true);
      isMountedRef.current = true;
      setValue(children);
    }
  }, [children]);

  return (
    <>
      {isError && <p>Failed to parse markdown</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !isError && HTMLReactParser(mdHtml)}
    </>
  );
}
