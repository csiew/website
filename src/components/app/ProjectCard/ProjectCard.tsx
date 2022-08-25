import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Project } from "../../../pages/Projects/@types";
import Button from "../../ui/Button";
import Paper from "../../ui/Paper";

const ProjectCard = ({ project }: { project: Project }) => {
  const [hideDetails, setHideDetails] = useState(true);

  return (
    <section className="project">
      <Paper>
        <div className="project-header">
          <div className="project-header-info" onClick={() => setHideDetails(!hideDetails)}>
            <h3>{project.name}</h3>
            <sub>{project.timeRange}</sub>
          </div>
          <div className="project-header-links">
            <Button url={project.url} newTab={true} disabled={project.url.length === 0}>Website</Button>
            <Button url={project.github} newTab={true} disabled={project.github.length === 0}>Repository</Button>
            <Button className="toggle-details" callback={() => setHideDetails(!hideDetails)}>
              {hideDetails ? "More" : "Less"}
            </Button>
          </div>
        </div>
        {
          !hideDetails ?
            (
              <div className="project-body">
                {
                  project.imgUrl ?
                    <img src={project.imgUrl} width="100%" />
                    :
                    <></>
                }
                <ReactMarkdown>
                  {project.description}
                </ReactMarkdown>
              </div>
            )
            :
            <></>
        }
      </Paper>
    </section>
  );
};

export default ProjectCard;
