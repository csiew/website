import { capitalize } from "lodash";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import Alert from "../../components/ui/Alert";
import Badge from "../../components/ui/Badge";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import NavigationView from "../../components/ui/NavigationView";
import config from "../../config";
import { ProjectV2 } from "../../lib/projects";
import retitle from "../../lib/retitle";
import useContentStoreHook from "../../stores/content/hook";

const ProjectDetail = () => {
  const router = useRouter();
  const contentStoreHook = useContentStoreHook();
  const isMountedRef = useRef<any>(null);

  const [urlSlug, setUrlSlug] = useState<string>();
  const [project, setProject] = useState<ProjectV2>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const getProject = async (force?: boolean) => {
    setIsLoading(true);
    const storeResult = await contentStoreHook.getProjects(force);
    const searchResult = storeResult.filter((p) => p.slug === urlSlug);
    if (storeResult.length) {
      console.debug({ project: searchResult[0] });
      setProject(searchResult[0]);
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const { slug } = router.query;
    setUrlSlug(slug as string);
  }, [router, router.query, router.query.slug]);

  useEffect(() => {
    if (urlSlug && urlSlug.length) {
      if (!isMountedRef.current) getProject();
      isMountedRef.current = true;
    }
  }, [urlSlug]);
  
  return (
    <>
      <Head>
        <title>{retitle(project?.name)}</title>
        <meta property="og:title" content={retitle(project?.name)} key="title" />
      </Head>
      <Breadcrumbs
        items={[
          {
            title: "Projects",
            href: "/projects"
          },
          {
            title: project?.name ?? "Project"
          }
        ]} />
      <NavigationView
        content={(
          <article className="contentPage">
            {
              isLoading
                ? (
                  <Alert variant="plain">
                    <span>Fetching project...</span>
                  </Alert>
                )
                : (
                  <>
                    {
                      !isSuccess
                        ? (
                          <Alert variant="error">
                            <span>Failed to fetch project.</span>
                          </Alert>
                        )
                        : <></>
                    }
                  </>
                )
            }
            <div className="header">
              <h2>{project?.name}</h2>
              <span className="timestamp">
                {project?.startYear && project?.endYear && (
                  <sub>{project.startYear} - {project.endYear}</sub>
                )}
              </span>
              {project?.status && <Badge>{capitalize(project.status)}</Badge>}
            </div>
            <div className="content">
              {project?.imgUrl && <img src={project?.imgUrl} width="100%" />}
              <ReactMarkdown>
                {decodeURI(project?.description ?? "")}
              </ReactMarkdown>
            </div>
            <hr />
            <p style={{ width: "100%", textAlign: "center" }}>
              <small><Link href="/projects">&larr; See all projects</Link></small>
            </p>
          </article>
        )} />
    </>
  );
};

export default ProjectDetail;
