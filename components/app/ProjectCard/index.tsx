import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import { ProjectV2 } from "../../../lib/projects";
import Button from "../../ui/Button";
import Paper from "../../ui/Paper";

const ProjectCard = ({ project }: { project: ProjectV2 }) => {
  return (
    <section className="project" id={project.id}>
      <Paper>
        <div className="projectHeader">
          <Link className="projectHeaderInfo" href={`/projects/${project.slug}`}>
            <h3>{project.name}</h3>
            <sub>{[project.startYear, project.endYear ? (project.startYear === project.endYear ? null : project.endYear) : (project.status === "inactive" ? null : "Present")].filter((y) => !!y).join(" - ")}</sub>
          </Link>
          <div className="projectHeaderLinks">
            <Button variant="link" url={project.siteUrl} newTab={true} disabled={!!project.siteUrl}>Website</Button>
            <Button variant="link" url={project.gitRepoUrl} newTab={true} disabled={!!project.gitRepoUrl}>Repository</Button>
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
