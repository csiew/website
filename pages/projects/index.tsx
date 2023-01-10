import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import config from "../../config";
import retitle from "../../lib/retitle";
import { determineStatusBadgeVariant, ProjectV2 } from "../../lib/projects";
import ProjectCard from "../../components/app/ProjectCard";
import NavigationView from "../../components/ui/NavigationView";
import useContentStoreHook from "../../stores/content/hook";
import Alert from "../../components/ui/Alert";
import Link from "next/link";
import Paper from "../../components/ui/Paper";
import Badge from "../../components/ui/Badge";
import { capitalize } from "lodash";

const Projects = () => {
  const contentStoreHook = useContentStoreHook();
  const isMountedRef = useRef<any>(null);

  const [projects, setProjects] = useState<ProjectV2[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  const getProjects = async (force?: boolean) => {
    setIsLoading(true);
    const result = await contentStoreHook.getProjects(force);
    if (result.length) {
      setProjects(result);
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
    if (!isMountedRef.current) getProjects();
    isMountedRef.current = true;
  }, []);

  return (
    <>
      <Head>
        <title>{retitle("Projects")}</title>
        <meta property="og:title" content={retitle("Projects")} key="title" />
      </Head>
      <NavigationView
        className="project-list-page"
        content={(
          <article className="app-page">
            {
              !isLoading && !isSuccess
                ? (
                  <Alert variant="error">
                    <span>Failed to fetch projects. <a href="#" onClick={() => getProjects(true)}>Try again.</a></span>
                  </Alert>
                )
                : <></>
            }
            {
              isLoading
                ? (
                  <Alert variant="plain">
                    <span>Fetching projects...</span>
                  </Alert>
                )
                : <></>
            }
            <h2>Projects</h2>
            <Paper variant="link-list">
              <ul>
                {
                  projects && projects.map((project) => (
                    <li key={project.id}>
                      <Link href={`/projects/${project.slug}`}>
                        <h3>{project.name}</h3>
                        <span className="timestamp">
                          {[project.startYear, project.endYear ? (project.startYear === project.endYear ? null : project.endYear) : (project.status === "inactive" ? null : "Present")].filter((y) => !!y).join(" - ")}
                        </span>
                        <span className="status">
                          <Badge variant={determineStatusBadgeVariant(project.status)}>
                            {capitalize(project.status)}
                          </Badge>
                        </span>
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </Paper>
          </article>
        )}
      />
    </>
  );
};

export default Projects;
