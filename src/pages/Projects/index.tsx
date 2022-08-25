import { useEffect } from "react";
import retitle from "../../lib/retitle";
import { ProjectData } from "./@types";
import rawProjectData from "./projects.json";
import ProjectCard from "../../components/app/ProjectCard";

const projectData = rawProjectData as ProjectData;

const Projects = () => {
  useEffect(() => {
    document.title = retitle("Projects");
    document.getElementById("root")?.scrollTo({ top: 0 });
  }, []);

  return (
    <article id="page-projects" className="top-level-page">
      <h2>Projects</h2>
      <div className="card-list">
        {
          projectData.projects.map((project) => {
            return (
              <ProjectCard key={`project-item-${project.id}`} project={project} />
            );
          })
        }
      </div>
    </article>
  );
};

export default Projects;
