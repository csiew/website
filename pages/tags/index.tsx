import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import config from "../../config";
import retitle from "../../lib/retitle";
import NavigationView from "../../components/ui/NavigationView";
import fetchTags, { Tag } from "../../utils/fetch-tags";

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
  const tags = await fetchTags();
  return { props: { tags } };
}

export default TagsPage;
