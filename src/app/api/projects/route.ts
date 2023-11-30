import { NextRequest, NextResponse } from "next/server";
import { queryDbRest } from "../../../client/db";

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
  let queryStr = "content_type=eq.project&order=body->duration->>start.desc,body->duration->>end.desc.nullslast,body->>status.asc";
  
  const searchParams = new URL(request.url).searchParams;

  if (searchParams.has("limit")) {
    const limit = Number(searchParams.get("limit"));
    if (limit > 0)
      queryStr += `&limit=${searchParams.get("limit")}`;
  }

  const result = await queryDbRest("item", queryStr);
  const projects = result.sort((a: any, b: any) => b.duration.start.localeCompare(a.duration.start));

  const isGroupingByDecade = !searchParams.has("list") || searchParams.get("list") !== "1";
  
  if (isGroupingByDecade) {
    const projectsGroupedByDecade = regroupByDecade(projects);
    return NextResponse.json({ projects: projectsGroupedByDecade });
  }
  return NextResponse.json({ projects });
}
