import { NextRequest, NextResponse } from "next/server";
import { queryDbRest } from "../../../client/db";

export async function GET(request: NextRequest) {
  const result = await queryDbRest("item", "content_type=eq.blog_post&body->>hiddenAt=is.null");
  const posts = result.sort((a: any, b: any) => b.publishedAt.localeCompare(a.publishedAt));
  return NextResponse.json({ posts });
}
