import { NextRequest, NextResponse } from "next/server";
import { queryDbRest } from "../../../client/db";

export async function GET(request: NextRequest) {
  let queryStr = "content_type=eq.project&order=body->duration->>start.desc,body->duration->>end.desc.nullslast,body->>status.asc";
  
  const searchParams = request.nextUrl.searchParams;

  if (searchParams.has("limit")) {
    const limit = Number(searchParams.get("limit"));
    if (limit > 0)
      queryStr += `&limit=${searchParams.get("limit")}`;
  }

  const result = await queryDbRest("item", queryStr);
  const projects = result.sort((a: any, b: any) => b.duration.start.localeCompare(a.duration.start));
  
  return NextResponse.json(projects);
}
