"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import _ from "lodash";
import styles from "./page.module.css";
import { determineStatusBadgeVariant } from "../../../lib/projects";
import Card from "../../../components/ui/Card/Card";
import Badge from "../../../components/ui/Badge/Badge";
import Markdown from "../../../components/ui/Markdown/Markdown";
import Breadcrumbs from "../../../components/ui/Breadcrumbs/Breadcrumbs";
import { Project } from "../../../@types";
import { DataContext } from "../../../stores/data";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const dataContext = useContext(DataContext);
  const [{ isLoading, isError }, setFetchState] = useState<{ isLoading: boolean, isError: boolean }>({ isLoading: false, isError: false });
  const [project, setProject] = useState<Project>();

  async function getProject() {
    try {
      setFetchState({ isLoading: true, isError: false });
      let data: Project | undefined;
      if (dataContext.projects.length) {
        data = dataContext.projects.find((project: Project) => project.urlSlug === params.id);
      }
      if (!data) {
        const rehydratedResult = await fetch(`/api/projects/${params.id}`);
        if (!rehydratedResult.ok)
          throw new Error(`Failed to fetch project: ${rehydratedResult.status} ${rehydratedResult.statusText}`);
        data = await rehydratedResult.json();
        if (data) data.body = atob(data.body);
      }
      setProject(data);
      setFetchState({ isLoading: false, isError: false });
    } catch (err) {
      console.error(err);
      setFetchState({ isLoading: false, isError: true });
    }
  }

  useEffect(() => {
    getProject();
  }, []);

  return (
    <>
      <Breadcrumbs
        items={[
          {
            title: "Projects",
            href: "/projects"
          },
          {
            title: project?.title ?? "Project"
          }
        ]}
      />
      <main className={styles.main}>
        <Card
          style={{
            display: "inline-flex",
            flexFlow: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "2rem"
          }}
        >
          {isError && <p>Failed to fetch project</p>}
          {isLoading && <p>Loading...</p>}
          {!isLoading && !isError && (
            <>
              <div className={styles.header}>
                <h2>{project?.title}</h2>
                <div className={styles.status}>
                  <sub>
                    {[project?.duration.start, project?.duration.end ? (project?.duration.start === project?.duration.end ? null : project?.duration.end) : (project?.status === "inactive" ? null : "Present")].filter((y) => !!y).join(" - ")}
                  </sub>
                  <Badge variant={determineStatusBadgeVariant(project?.status ?? "inactive")}>
                    {_.capitalize(project?.status)}
                  </Badge>
                </div>
              </div>
              {!!project?.assets?.screenshots?.length && (
                <Link
                  href={project?.assets?.screenshots[0]}
                  className={styles.screenshot}
                >
                  <img src={project?.assets?.screenshots[0]} width="100%" />
                </Link>
              )}
              <Markdown>{project?.body}</Markdown>
              <div className={styles.links}>
                <ul>
                  <li>
                    <Link
                      href={project?.links?.website ?? "#"}
                      target="_blank"
                      className={!project?.links?.website ? styles.disabled : undefined}
                    >
                      Website
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={project?.links?.repository ?? "#"}
                      target="_blank"
                      className={!project?.links?.repository ? styles.disabled : undefined}
                    >
                      Repository
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
        </Card>
      </main>
    </>
  );
}
