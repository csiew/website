import React, { useEffect } from "react";
import retitle from "../../lib/retitle";
import { ProjectData } from "./@types";
import rawProjectData from "./projects.json";
import ProjectCard from "../../components/app/ProjectCard";
import NavigationView from "../../components/ui/NavigationView";
import NavigationSidebar from "../../components/ui/NavigationSidebar";

const projectData = rawProjectData as ProjectData;

const Projects = () => {
  useEffect(() => {
    document.title = retitle("Projects");
    document.getElementById("root")?.scrollTo({ top: 0 });
  }, []);

  return (
    <NavigationView
      nav={(
        <NavigationSidebar
          keyPrefix="project-item-"
          items={
            projectData.projects.map((project) =>({
              key: `project-name-${project.id}`,
              label: project.name,
              url: `#${project.id}`
            }))
          }
        />
      )}
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
  );
};

export default Projects;