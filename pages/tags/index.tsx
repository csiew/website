import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import config from "../../config";
import retitle from "../../lib/retitle";
import NavigationView from "../../components/ui/NavigationView";
import { SearchData, getTags } from "../../lib/manifest";
import { useRouter } from "next/router";

const TagsPage = () => {
  const router = useRouter();
  const isMountedRef = useRef<boolean>(false);
  const [tags, setTags] = useState<Map<string, SearchData[]>>();

  const handleScrollToQueryTag = () => {
    const { t } = router.query;
    if (t?.length && tags?.size) {
      const tagEl = document.getElementById(t as string);
      if (tagEl) {
        const top = (tagEl?.getBoundingClientRect().top ?? 0) - 96;
        tagEl.style.border = "3px solid var(--primary-color)";
        document.getElementById(config.rootElementId)?.scrollTo({ top });
      }
    }
  };

  useEffect(() => {
    handleScrollToQueryTag();
  }, [router.query, tags]);

  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
    if (!isMountedRef.current) {
      const results = getTags();
      setTags(results);
    }
    isMountedRef.current = true;
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
            {
              tags && (
                <>
                  <ul>
                    {
                      [...tags.entries()]
                        .sort(([_a, aUsages], [_b, bUsages]) => {
                          return aUsages.length < bUsages.length ? 1 : -1;
                        })
                        .map(([key, usages]) => {
                          return (
                            <li key={key} id={key}>
                              <span>{key} ({usages.length})</span>
                              <ul>
                                {
                                  usages.map((usage) => {
                                    return (
                                      <li key={usage.url}>
                                        <Link href={usage.url}>{usage.title}</Link> ({usage.type})
                                      </li>
                                    );
                                  })
                                }
                              </ul>
                            </li>
                          );
                        })
                    }
                  </ul>
                </>
              )
            }
          </article>
        }
      />
    </>
  );
};

export default TagsPage;
