import { createClient } from "@supabase/supabase-js";
import config from "../config";

export type Tag = {
  value: string;
  count: number;
};

export default async function () {
  const supabase = createClient(`https://${config.supabase.host}`, config.supabase.apiKey as string);
  const result = await supabase
    .from("item")
    .select("body->tags")
    .filter("body->tags", "neq", null);
  const tagStrings: string[] = result.data?.flatMap((d) => d.tags as string[]) ?? [];
  let tags: Tag[] = [];
  tagStrings.forEach((t) => {
    const tagEntryIndex = tags.findIndex((tag) => tag.value === t);
    if (tagEntryIndex === -1) {
      tags.push({
        value: t,
        count: 1
      });
    } else {
      tags[tagEntryIndex] = {
        value: t,
        count: tags[tagEntryIndex].count + 1
      };
    }
  });
  tags = tags.sort((a: any, b: any) => a.count < b.count ? 1 : -1) ?? [];
  return tags;
}
