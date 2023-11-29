import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";
import _ from "lodash";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import styles from "./Projects.module.css";
import Card from "../../components/ui/Card/Card";
import Badge from "../../components/ui/Badge/Badge";
import { determineStatusBadgeVariant } from "../../lib/projects";

const decadeGroupNameMap = new Map<string, string>([
  ["200", "2000s"],
  ["201", "2010s"],
  ["202", "2020s"],
  ["203", "2030s"],
  ["204", "2040s"],
]);

export default function Projects() {
  const isMountedRef = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [projects, setProjects] = useState<any>();
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set<string>());

  async function getProjects() {
    setIsLoading(true);
    const result = await axios.get("/api/projects");
    if (result.status !== 200) {
      console.error(result.statusText);
      setIsError(true);
      return;
    }
    const { data } = result;
    setProjects(data.projects);
    setIsLoading(false);
  }

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      getProjects();
    }
  }, []);

  return (
    <Card>
      <h2>Projects</h2>
      {isError && <p>Failed to load projects</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !isError && (
        <div className={styles.container}>
          {
            projects &&
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
