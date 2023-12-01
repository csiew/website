import { NextRequest, NextResponse } from "next/server";
import { queryDbRest } from "../../../client/db";

export async function GET(request: NextRequest) {
  try {
    let queryStr = "content_type=eq.blog_post&body->>hiddenAt=is.null&order=body->>publishedAt.desc";
  
    const searchParams = request.nextUrl.searchParams;
  
    if (searchParams.has("limit")) {
      const limit = Number(searchParams.get("limit"));
      if (limit > 0)
        queryStr += `&limit=${searchParams.get("limit")}`;
    }
  
    const result = await queryDbRest("item", queryStr);
    console.log({ result });
    const posts = result.sort((a: any, b: any) => (new Date(a.publishedAt)).getTime() < (new Date(b.publishedAt)).getTime() ? 1 : -1);
    console.log({ posts });
    return NextResponse.json({ posts });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
