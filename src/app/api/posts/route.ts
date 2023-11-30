import { NextRequest, NextResponse } from "next/server";
import { queryDbRest } from "../../../client/db";

export async function GET(request: NextRequest) {
  try {
    let queryStr = "content_type=eq.blog_post&body->>hiddenAt=is.null";
  
    const searchParams = new URL(request.url).searchParams;
  
    if (searchParams.has("order")) {
      const order = searchParams.get("order");
      if (!!order && ["asc", "desc"].includes(order)) {
        queryStr += `&order=body->>publishedAt.${order}`;
      }
    }
  
    if (searchParams.has("limit")) {
      const limit = Number(searchParams.get("limit"));
      if (limit > 0)
        queryStr += `&limit=${searchParams.get("limit")}`;
    }
  
    const result = await queryDbRest("item", queryStr);
    const posts = result.sort((a: any, b: any) => b.publishedAt.localeCompare(a.publishedAt));
    return NextResponse.json({ posts });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
