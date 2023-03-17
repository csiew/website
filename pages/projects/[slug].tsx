import React, { useEffect } from "react";
import fs from "fs";
import path from "path";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { capitalize } from "lodash";
import retitle from "../../lib/retitle";
import projectManifest from "./manifest";
import config from "../../config";
import Badge from "../../components/ui/Badge";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import Button from "../../components/ui/Button";
import ButtonGroup from "../../components/ui/ButtonGroup";
import NavigationView from "../../components/ui/NavigationView";
import Paper from "../../components/ui/Paper";
import { determineStatusBadgeVariant } from "../../lib/projects";

const ProjectPage = ({ project }: { project: { [k: string]: any } }) => {
  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Head>
        <title>{retitle(project?.name)}</title>
        <meta property="og:title" content={retitle(project?.name)} key="title" />
      </Head>
      <Breadcrumbs
        items={[
          {
            title: "Projects",
            href: "/projects"
          },
          {
            title: project?.name ?? "Project"
          }
        ]} />
      <NavigationView
        className="project-detail-page"
        content={(
          <article className="content-page">
            <div className="header">
              <h2>{project?.title}</h2>
              <span className="timestamp">
                {project?.duration?.start && project?.duration?.end && (
                  <sub>{project.duration?.start} - {project.duration?.end}</sub>
                )}
              </span>
              {project?.status && <Badge variant={determineStatusBadgeVariant(project.status)}>{capitalize(project.status)}</Badge>}
            </div>
            <div className="content">
              {project?.assets?.screenshots && project?.assets?.screenshots[0] && (
                // TODO: Replace this with carousel
                <Link href={project?.assets?.screenshots[0]}>
                  <img src={project?.assets?.screenshots[0]} width="100%" />
                </Link>
              )}
              <Paper style={{ width: "100%" }}>
                <div style={{
                  width: "100%",
                  margin: "0.5rem 0rem 1rem 0rem",
                  display: "inline-flex",
                  flexFlow: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem"
                }}>
                  {project?.stack && project?.stack.map((item: any) => {
                    return <Badge variant="plain">{item}</Badge>
                  })}
                </div>
                <ReactMarkdown>
                  {decodeURI(project?.content ?? "")}
                </ReactMarkdown>
                <ButtonGroup orientation="horizontal" style={{ width: "100%", justifyContent: "center", margin: "1.5rem 0rem 0.5rem 0rem" }}>
                  <Button variant="link" url={project?.links?.website} newTab={true} disabled={!project?.links?.website}>Website</Button>
                  <Button variant="link" url={project?.links?.repository} newTab={true} disabled={!project?.links?.repository}>Repository</Button>
                </ButtonGroup>
              </Paper>
            </div>
            <hr />
            <p style={{ width: "100%", textAlign: "center" }}>
              <small><Link href="/projects">&larr; See all projects</Link></small>
            </p>
          </article>
        )} />
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [...projectManifest.keys()].map((slug) => ({ params: { slug } })),
    fallback: false
  };
};

export async function getStaticProps(context: any) {
  const postContentDir = path.join(process.cwd(), "content", "projects");
  const definition = projectManifest.get(context.params.slug);
  const content = fs.readFileSync(path.join(postContentDir, definition?.filePath), { encoding: "utf8" });
  const project = {
    ...projectManifest.get(context.params.slug),
    slug: context.params.slug,
    content
  };
  return {
    props: { project },
  };
};

export default ProjectPage;
