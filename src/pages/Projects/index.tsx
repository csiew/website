import { useEffect } from "react";
import "./index.css";
import retitle from "../../lib/retitle";
import { ProjectData } from "./@types";
import rawProjectData from "./projects.json";
import Paper from "../../components/ui/Paper";
import ReactMarkdown from "react-markdown";
import Button from "../../components/ui/Button";

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
              <section key={`project-item-${project.id}`}>
                <Paper>
                  <div className="project-header">
                    <h3>{project.name}</h3>
                    <div className="project-header-links">
                      <Button url={project.url} newTab={true} disabled={project.url.length === 0}>Website</Button>
                      <Button url={project.github} newTab={true}>Repository</Button>
                    </div>
                  </div>
                  {
                    project.imgUrl ?
                      <img src={project.imgUrl} width="100%" />
                      :
                      <></>
                  }
                  <ReactMarkdown>
                    {project.description}
                  </ReactMarkdown>
                </Paper>
              </section>
            );
          })
        }
      </div>
    </article>
  );
};

export default Projects;
