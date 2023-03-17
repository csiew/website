import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { capitalize } from "lodash";
import retitle from "../../lib/retitle";
import { determineStatusBadgeVariant } from "../../lib/projects";
import { projectManifest } from "../../manifests/projects";
import config from "../../config";
import NavigationView from "../../components/ui/NavigationView";
import Badge from "../../components/ui/Badge";

const decadeGroupNameMap = new Map<string, string>([
  ["200", "2000s"],
  ["201", "2010s"],
  ["202", "2020s"],
  ["203", "2030s"],
  ["204", "2040s"],
]);

const Projects = ({ projects }: { projects: { [k: string]: any } }) => {
  const [
    projectsGroupedByDecade,
    setProjectsGroupedByDecade
  ] = useState();

  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
    const decadeGroupings = {} as any;
    projects.forEach((project: any) => {
      const decadeKey = project.duration.start.slice(0, 3);
      if (!decadeGroupings[decadeKey]) {
        decadeGroupings[decadeKey] = [];
      }
      decadeGroupings[decadeKey].push(project);
    });
    setProjectsGroupedByDecade(decadeGroupings);
  }, []);

  return (
    <>
      <Head>
        <title>{retitle("Projects")}</title>
        <meta property="og:title" content={retitle("Projects")} key="title" />
      </Head>
      <NavigationView
        className="project-list-page"
        content={(
          <article className="app-page">
            <h2>Projects</h2>
            <div className="project-decade-group-container">
              {
                projectsGroupedByDecade &&
                Object.entries<[string, any[]]>(projectsGroupedByDecade).sort((a, b) => a[0] < b[0] ? 1 : -1).map(([decadeGroupName, projectsInDecade]) => {
                  return (
                    <div key={decadeGroupName} className="project-decade-group">
                      <h3>{decadeGroupNameMap.get(decadeGroupName)}</h3>
                      <div className="project-list">
                        {
                          projectsInDecade && projectsInDecade.map((project: any) => (
                            <div key={project.slug} className="project-list-item">
                              <div className="head">
                                <h4>
                                  <Link href={`/projects/${project.slug}`}>
                                    {project.title}
                                  </Link>
                                </h4>
                                <p>{project.subtitle}, <span>{[project.duration.start, project.duration.end ? (project.duration.start === project.duration.end ? null : project.duration.end) : (project.status === "inactive" ? null : "Present")].filter((y) => !!y).join(" - ")}</span></p>
                              </div>
                              <span className="status">
                                <Badge variant={determineStatusBadgeVariant(project.status)}>
                                  {capitalize(project.status)}
                                </Badge>
                              </span>
                            </div>
                          ))
                        }
                      </div>
                    </div>
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

export const getStaticProps = async (context: any) => {
  const projects = [...projectManifest.entries()]
    .map(([slug, definition]) => {
      return {
        ...definition,
        slug
      };
    })
    .sort((a: any, b: any) => {
      return a.duration?.start < b.duration?.start ? 1 : -1;
    });
  return {
    props: { projects },
  };
};

export default Projects;
