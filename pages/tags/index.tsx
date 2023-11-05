import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import config from "../../config";
import retitle from "../../lib/retitle";
import NavigationView from "../../components/ui/NavigationView";
import { queryDbRest } from "../../client/db";

export type Tag = {
  value: string;
  count: number;
};

function TagsPage({ tags }: { tags: Tag[] }) {
  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);
  
  return (
    <>
      <Head>
        <title>{retitle("Tags")}</title>
        <meta property="og:title" content={retitle("Tags")} key="title" />
      </Head>
      <NavigationView
        content={
          <article className="app-page">
            <h2>Tags</h2>
            <ul className="tags-list">
              {tags && tags.map((tag) => (
                <li key={tag.value}>
                  <h3>
                    <Link href={`/tags/${tag.value}`}>
                      {tag.value}
                    </Link>
                  </h3>
                  <sub>{tag.count} items</sub>
                </li>
              ))}
            </ul>
          </article>
        }
      />
    </>
  );
}

export async function getStaticProps() {
  const result = await queryDbRest("item", "SELECT value::TEXT, COUNT(value) FROM (SELECT * FROM item WHERE item.body->>'tags' IS NOT NULL) a, jsonb_array_elements(a.body->'tags') GROUP BY value;");
  const tags: Tag[] = result.rows
    .map((tag: any) => ({
      value: tag.value.replaceAll("\"", ""),
      count: Number(tag.count)
    }))
    .sort((a: any, b: any) => a.count < b.count ? 1 : -1);
  return { props: { tags } };
}

export default TagsPage;
