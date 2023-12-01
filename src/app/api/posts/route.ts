import { NextRequest, NextResponse } from "next/server";
import { queryDbRest } from "../../../client/db";

export async function GET(request: NextRequest) {
  let queryStr = "content_type=eq.blog_post&body->>hiddenAt=is.null&order=body->>publishedAt.desc";

  const searchParams = request.nextUrl.searchParams;

  if (searchParams.has("limit")) {
    const limit = Number(searchParams.get("limit"));
    if (limit > 0)
      queryStr += `&limit=${searchParams.get("limit")}`;
  }

  const result = await queryDbRest("item", queryStr);
  const posts = result.sort((a: any, b: any) => (new Date(a.publishedAt)).getTime() < (new Date(b.publishedAt)).getTime() ? 1 : -1);
  return NextResponse.json({ posts });
}
