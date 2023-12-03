import { Project } from "../@types";
import { BadgeVariant } from "../components/ui/Badge/Badge";

export function determineStatusBadgeVariant(status: string): BadgeVariant {
  switch (status) {
  case "active":
    return "success";
  case "hiatus":
    return "warning";
  case "inactive":
    return "error";
  default:
    return "plain";
  }
}

export function regroupByDecade(projects: Project[]) {
  const decadeGroupings = {} as { [k: string]: Project[] };
  projects.forEach((project: any) => {
    const decadeKey = project.duration.start.slice(0, 3);
    if (!decadeGroupings[decadeKey]) {
      decadeGroupings[decadeKey] = [];
    }
    decadeGroupings[decadeKey].push(project);
  });
  return decadeGroupings;
}
