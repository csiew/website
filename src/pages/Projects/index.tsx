import { useEffect } from "react";
import "./index.css";
import retitle from "../../lib/retitle";
import { ProjectData } from "./@types";
import rawProjectData from "./projects.json";
import ProjectCard from "../../components/app/ProjectCard";

const projectData = rawProjectData as ProjectData;

const Projects = () => {
  useEffect(() => {
    document.title = retitle("Projects");
  }, []);

  return (
    <article id="page-projects" className="top-level-page">
      <h2>Projects</h2>
      <div className="projects">
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
