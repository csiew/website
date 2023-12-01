import { NextResponse } from "next/server";
import generateRssFeed from "../../utils/generate-rss-feed";

export async function GET() {
  const feed = await generateRssFeed();

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
