import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import config from "../../config";
import retitle from "../../lib/retitle";
import { ProjectData, ProjectV2 } from "../../lib/projects";
import rawProjectData from "./projects.json";
import ProjectCard from "../../components/app/ProjectCard";
import NavigationView from "../../components/ui/NavigationView";
import useContentStoreHook from "../../stores/content/hook";
import Alert from "../../components/ui/Alert";

const projectData = rawProjectData as ProjectData;

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
        navPosition="right"
        content={(
          <article className="appPage">
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
            <div className="cardList">
              {
                projects && projects.map((project) => {
                  return (
                    <ProjectCard
                      key={`project-item-${project.id}`}
                      project={project}
                    />
                  );
                })
              }
            </div>
          </article>
        )}
      />
    </>
  );
};

export default Projects;
