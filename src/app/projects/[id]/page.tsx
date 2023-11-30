"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import _ from "lodash";
import styles from "./page.module.css";
import { determineStatusBadgeVariant } from "../../../lib/projects";
import Card from "../../../components/ui/Card/Card";
import Badge from "../../../components/ui/Badge/Badge";
import Markdown from "../../../components/ui/Markdown/Markdown";
import Breadcrumbs from "../../../components/ui/Breadcrumbs/Breadcrumbs";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const isMountedRef = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [project, setProject] = useState<any>();

  async function getProject() {
    try {
      setIsLoading(true);
      const result = await fetch(`/api/projects/${params.id}`);
      if (!result.ok) {
        throw new Error(`Failed to fetch project: ${result.status} ${result.statusText}`);
      }
      const data = await result.json();
      data.body = atob(data.body);
      setProject(data);
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
      getProject();
    }
  }, []);

  return (
    <main className={styles.main}>
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
      {isError && <p>Failed to fetch project</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !isError && (
        <Card
          style={{
            display: "inline-flex",
            flexFlow: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "2rem"
          }}
        >
          <div className={styles.header}>
            <h2>{project?.title}</h2>
            <div className={styles.status}>
              <sub>
                {[project?.duration.start, project?.duration.end ? (project?.duration.start === project?.duration.end ? null : project?.duration.end) : (project?.status === "inactive" ? null : "Present")].filter((y) => !!y).join(" - ")}
              </sub>
              <Badge variant={determineStatusBadgeVariant(project?.status)}>
                {_.capitalize(project?.status)}
              </Badge>
            </div>
          </div>
          {!!project?.assets?.screenshots.length && (
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
        </Card>
      )}
    </main>
  );
}
