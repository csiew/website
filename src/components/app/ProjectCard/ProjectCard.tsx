import ReactMarkdown from "react-markdown";
import { Project } from "../../../pages/Projects/@types";
import Button from "../../ui/Button";
import Paper from "../../ui/Paper";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <section className="project">
      <Paper>
        <div className="project-header">
          <div className="project-header-info">
            <h3>{project.name}</h3>
            <sub>{project.timeRange}</sub>
          </div>
          <div className="project-header-links">
            <Button url={project.url} newTab={true} disabled={project.url.length === 0}>Website</Button>
            <Button url={project.github} newTab={true} disabled={project.github.length === 0}>Repository</Button>
          </div>
        </div>
        <div className="project-body">
          {
            project.imgUrl ?
              <a href={project.imgUrl} target="_blank" rel="noreferrer">
                <img src={project.imgUrl} width="100%" alt={project.name} loading="lazy" draggable="false" />
              </a>
              :
              <></>
          }
          <ReactMarkdown>
            {project.description}
          </ReactMarkdown>
        </div>
      </Paper>
    </section>
  );
};

export default ProjectCard;
