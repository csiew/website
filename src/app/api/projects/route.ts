import { NextRequest, NextResponse } from "next/server";
import { queryDbRest } from "../../../client/db";

const decadeGroupNameMap = new Map<string, string>([
  ["200", "2000s"],
  ["201", "2010s"],
  ["202", "2020s"],
  ["203", "2030s"],
  ["204", "2040s"],
]);

function regroupByDecade(projects: any) {
  const decadeGroupings = {} as any;
  projects.forEach((project: any) => {
    const decadeKey = project.duration.start.slice(0, 3);
    if (!decadeGroupings[decadeKey]) {
      decadeGroupings[decadeKey] = [];
    }
    decadeGroupings[decadeKey].push(project);
  });
  return decadeGroupings;
}

export async function GET(request: NextRequest) {
  const result = await queryDbRest("item", "content_type=eq.project");
  const projects = result.sort((a: any, b: any) => b.duration.start.localeCompare(a.duration.start));
  const projectsGroupedByDecade = regroupByDecade(projects);
  return NextResponse.json({ projects: projectsGroupedByDecade });
}
