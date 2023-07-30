import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { capitalize } from "lodash";
import retitle from "../../lib/retitle";
import config from "../../config";
import Badge from "../../components/ui/Badge";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import Button from "../../components/ui/Button";
import ButtonGroup from "../../components/ui/ButtonGroup";
import NavigationView from "../../components/ui/NavigationView";
import Paper from "../../components/ui/Paper";
import { determineStatusBadgeVariant } from "../../lib/projects";
import TagList from "../../components/app/TagList";

const ProjectPage = ({ project }: { project: any }) => {
  const router = useRouter();

  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Head>
        <title>{retitle(project?.title)}</title>
        <meta property="og:title" content={retitle(project?.title)} key="title" />
      </Head>
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
                  flexFlow: "row wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem"
                }}>
                  {project?.stack && project?.stack.map((item: any) => {
                    return <Badge key={encodeURI(`${project?.title} ${item}`)} variant="plain">{item}</Badge>;
                  })}
                </div>
                <ReactMarkdown>
                  {atob(project?.body ?? "")}
                </ReactMarkdown>
                <ButtonGroup orientation="horizontal" style={{ width: "100%", justifyContent: "center", margin: "1.5rem 0rem 0.5rem 0rem" }}>
                  <Button variant="link" url={project?.links?.website} newTab={true} disabled={!project?.links?.website}>Website</Button>
                  <Button variant="link" url={project?.links?.repository} newTab={true} disabled={!project?.links?.repository}>Repository</Button>
                </ButtonGroup>
              </Paper>
              <TagList item={project} />
            </div>
            <hr />
            <button
              title="See all projects"
              onClick={() => router.replace("/projects")}
              style={{ marginInline: "auto" }}
            >
              See all projects
            </button>
          </article>
        )} />
    </>
  );
};

export async function getStaticPaths() {
  const response = await fetch(
    `https://${config.supabase.host}/rest/v1/item?content_type=eq.project`,
    {
      headers: {
        "apikey": config.supabase.apiKey as string
      }
    }
  );
  const projects = (await response.json()).map((project: any) => project.body);
  const paths = projects.map((project: any) => ({ params: { slug: project.urlSlug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const { slug } = params;
  const response = await fetch(
    `https://${config.supabase.host}/rest/v1/item?content_type=eq.project&body->>urlSlug=eq.${slug}`,
    {
      headers: {
        "apikey": config.supabase.apiKey as string
      }
    }
  );
  const project = (await response.json()).map((project: any) => project.body)?.[0];
 
  return { props: { project } };
}

export default ProjectPage;
