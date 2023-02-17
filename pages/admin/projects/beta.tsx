import MultiContentList from "../../../components/templates/admin/multi-content-list";
import { deleteProject, saveProject } from "../../../firebase/projects";

const ProjectsBeta = ({ isLoggedIn }: any) => {
  return <MultiContentList
    isLoggedIn={isLoggedIn}
    terminology={{
      pageTitle: "Projects",
      itemPlural: "projects",
      itemSingular: "project",
      urlSlug: "projects"
    }}
    firebaseCallbacks={{
      save: saveProject,
      delete: deleteProject
    }}
    contextRefs={{
      storePropName: "projects"
    }} />;
};

export default ProjectsBeta;
