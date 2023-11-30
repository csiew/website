import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import _ from "lodash";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import styles from "./Projects.module.css";
import Card from "../../components/ui/Card/Card";
import Badge from "../../components/ui/Badge/Badge";
import { determineStatusBadgeVariant } from "../../lib/projects";
import CardHeader from "../../components/ui/Card/CardHeader";

const decadeGroupNameMap = new Map<string, string>([
  ["200", "2000s"],
  ["201", "2010s"],
  ["202", "2020s"],
  ["203", "2030s"],
  ["204", "2040s"],
]);

export default function Projects({ isListView }: { isListView?: boolean }) {
  const isMountedRef = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [projects, setProjects] = useState<any>();
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set<string>());

  async function getProjects() {
    try {
      setIsLoading(true);
      let queryUrl = "/api/projects";
      if (!isListView) {
        queryUrl += "?limit=5&list=1";
      }
      const result = await fetch(queryUrl);
      if (!result.ok) {
        throw new Error(`Failed to fetch projects: ${result.status} ${result.statusText}`);
      }
      const data = await result.json();
      setProjects(data.projects);
      setIsError(false);
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      getProjects();
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <h2>
          {isListView ? "Projects" : <Link href="/projects">Projects</Link>}
        </h2>
        {!isListView && (
          <Link href="/projects" className="seeAllBtn">
            See all projects
          </Link>
        )}
      </CardHeader>
      {isError && <p>Failed to load projects</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !isError && !!projects && (
        <div className={styles.container}>
          {!isListView && (
            <div className={styles.group}>
              <ul>
                {projects.sort((a: any, b: any) => a.duration.start < b.duration.start ? 1 : -1).map((project: any) => (
                  <li key={project.urlSlug}>
                    <div className={styles.projectHeader}>
                      <h4>
                        <Link href={`/projects/${project.urlSlug}`}>
                          {project.title}
                        </Link>
                      </h4>
                      <sub>{[project.duration.start, project.duration.end ? (project.duration.start === project.duration.end ? null : project.duration.end) : (project.status === "inactive" ? null : "Present")].filter((y) => !!y).join(" - ")}</sub>
                    </div>
                    <p>{project.subtitle}</p>
                    <span className="status">
                      <Badge variant={determineStatusBadgeVariant(project.status)}>
                        {_.capitalize(project.status)}
                      </Badge>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {
            isListView &&
            Object.entries<[string, any[]]>(projects).sort((a, b) => a[0] < b[0] ? 1 : -1).map(([decadeGroupName, projectsInDecade]) => {
              return (
                <div key={decadeGroupName} className={styles.group}>
                  <h3
                    onClick={() => {
                      const updatedCollapsedGroups = _.clone(collapsedGroups);
                      if (collapsedGroups.has(decadeGroupName)) {
                        updatedCollapsedGroups.delete(decadeGroupName);
                      } else {
                        updatedCollapsedGroups.add(decadeGroupName);
                      }
                      setCollapsedGroups(updatedCollapsedGroups);
                    }}
                  >
                    <span>{decadeGroupNameMap.get(decadeGroupName)}</span>
                    {collapsedGroups.has(decadeGroupName) ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                  </h3>
                  {!collapsedGroups.has(decadeGroupName) && (
                    <ul>
                      {
                        projectsInDecade && projectsInDecade.map((project: any) => (
                          <li key={project.urlSlug}>
                            <div className={styles.projectHeader}>
                              <h4>
                                <Link href={`/projects/${project.urlSlug}`}>
                                  {project.title}
                                </Link>
                              </h4>
                              <sub>{[project.duration.start, project.duration.end ? (project.duration.start === project.duration.end ? null : project.duration.end) : (project.status === "inactive" ? null : "Present")].filter((y) => !!y).join(" - ")}</sub>
                            </div>
                            <p>{project.subtitle}</p>
                            <span className="status">
                              <Badge variant={determineStatusBadgeVariant(project.status)}>
                                {_.capitalize(project.status)}
                              </Badge>
                            </span>
                          </li>
                        ))
                      }
                    </ul>
                  )}
                </div>
              );
            })
          }
        </div>
      )}
    </Card>
  );
}
