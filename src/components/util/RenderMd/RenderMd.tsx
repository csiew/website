import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeExternalLinks from "rehype-external-links";

function RenderMd(props: { children: string }): React.ReactElement {
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeExternalLinks]}>
      {props.children}
    </ReactMarkdown>
  );
}

export default React.memo(RenderMd);
