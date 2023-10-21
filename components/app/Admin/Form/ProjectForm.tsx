import _ from "lodash";
import React, { useState } from "react";

type ProjectFormState = {
  title: string;
  subtitle: string;
  status: "active" | "inactive" | "hiatus";
  urlSlug: string;
  duration: {
    start?: string;
    end?: string;
  };
  links: {
    website?: string;
    repository?: string;
  };
  tags: string[];
  body: string;
};

export default function ProjectForm({
  setItemBody
}: {
  setItemBody: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [project, setProject] = useState<ProjectFormState>({
    title: "",
    subtitle: "",
    status: "active",
    urlSlug: "",
    duration: {},
    links: {},
    tags: [],
    body: ""
  });

  function handleChange(field: string, content: string | string[] | boolean) {
    const updatedProject = { ...project } as any;
    _.set(updatedProject, field, content);
    setProject(updatedProject);
    setItemBody(JSON.stringify(updatedProject));
  }

  function handleAddTag(e: React.KeyboardEvent) {
    (e.target as any).value = ((e.target as any).value).replaceAll(" ", "");
    if (e.key === "Enter") {
      e.preventDefault();
      const tag = (e.target as any).value;
      if (!!tag.length && !project.tags.includes(tag)) {
        const updatedProject = {
          ...project,
          tags: [...project.tags, tag]
        };
        setProject(updatedProject);
        setItemBody(JSON.stringify(updatedProject));
      }
      (e.target as any).value = "";
    }
  }

  return (
    <>
      <span className="form-field">
        <label htmlFor="project-title">
          Title
        </label>
        <input
          type="text"
          name="project-title"
          defaultValue={project.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </span>
      <span className="form-field">
        <label htmlFor="project-subtitle">
          Subtitle
        </label>
        <input
          type="text"
          name="project-subtitle"
          defaultValue={project.subtitle}
          onChange={(e) => handleChange("subtitle", e.target.value)}
        />
      </span>
      <span className="form-field">
        <label htmlFor="project-url-slug">
          URL Slug
        </label>
        <input
          type="text"
          name="project-url-slug"
          defaultValue={project.subtitle}
          onChange={(e) => handleChange("urlSlug", e.target.value)}
        />
      </span>
      <span className="form-field">
        <label htmlFor="project-status">
          Status
        </label>
        <select defaultValue="active" onChange={(e) => handleChange("status", e.target.value)}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="hiatus">Hiatus</option>
        </select>
      </span>
      <div style={{
        width: "100%",
        display: "inline-flex",
        flexFlow: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: "1rem"
      }}>
        <span className="form-field">
          <label htmlFor="project-duration-start">
            Duration Start
          </label>
          <input
            type="text"
            name="project-duration-start"
            defaultValue={project.duration.start}
            onChange={(e) => handleChange("duration.start", e.target.value)}
          />
        </span>
        <span className="form-field">
          <label htmlFor="project-duration-end">
            Duration End
          </label>
          <input
            type="text"
            name="project-duration-end"
            defaultValue={project.duration.end}
            onChange={(e) => handleChange("duration.end", e.target.value)}
          />
        </span>
      </div>
      <span className="form-field">
        <label htmlFor="project-body">
          Body
        </label>
        <textarea
          defaultValue={atob(project.body)}
          onChange={(e) => handleChange("body", btoa(e.target.value))}
        />
      </span>
      <span className="form-field">
        <label htmlFor="project-website-url">
          Website URL
        </label>
        <input
          type="text"
          name="project-website-url"
          defaultValue={project.subtitle}
          onChange={(e) => handleChange("links.website", e.target.value)}
        />
      </span>
      <span className="form-field">
        <label htmlFor="project-repository-url">
          Repository URL
        </label>
        <input
          type="text"
          name="project-repository-url"
          defaultValue={project.subtitle}
          onChange={(e) => handleChange("links.repository", e.target.value)}
        />
      </span>
      <span className="form-field">
        <label htmlFor="project-tags">
          Tags
        </label>
        <input
          type="text"
          onKeyDown={handleAddTag}
        />
        {!!project.tags.length && (
          <ul>
            {project.tags.map((tag) => (
              <li key="tag">
                {tag} (<a href="#" onClick={() => setProject({ ...project, tags: project.tags.filter((t) => t !== tag) })}>Delete</a>)
              </li>
            ))}
          </ul>
        )}
      </span>
    </>
  );
}
