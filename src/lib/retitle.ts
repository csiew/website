import config from "../config";

export default (title?: string): string => {
  if (!title) return config.title.text;
  return [title, config.title.divider, config.title.text].join(" ");
};
