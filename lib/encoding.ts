export const encodeContent = (content: string): string => {
  return Buffer.from(content, "utf-8").toString("base64");
};

export const decodeContent = (content: string): string => {
  return Buffer.from(content, "base64").toString("utf-8");
};
