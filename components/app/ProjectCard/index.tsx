import React from "react";
import ReactMarkdown from "react-markdown";
import { Project } from "../../../lib/projects";
import Button from "../../ui/Button";
import Paper from "../../ui/Paper";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <section className="project" id={project.id}>
      <Paper>
        <div className="projectHeader">
          <div className="projectHeaderInfo">
            <h3>{project.name}</h3>
            <sub>{project.timeRange}</sub>
          </div>
          <div className="projectHeaderLinks">
            <Button url={project.url} newTab={true} disabled={project.url.length === 0}>Website</Button>
            <Button url={project.github} newTab={true} disabled={project.github.length === 0}>Repository</Button>
          </div>
        </div>
        <div className="projectBody">
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
