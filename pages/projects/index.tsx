import React, { useEffect } from "react";
import Head from "next/head";
import config from "../../config";
import retitle from "../../lib/retitle";
import { ProjectData } from "../../lib/projects";
import rawProjectData from "./projects.json";
import ProjectCard from "../../components/app/ProjectCard";
import NavigationView from "../../components/ui/NavigationView";

const projectData = rawProjectData as ProjectData;

const Projects = () => {
  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
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
          <article className="topLevelPage">
            <h2>Projects</h2>
            <div className="cardList">
              {
                projectData.projects.map((project) => {
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
