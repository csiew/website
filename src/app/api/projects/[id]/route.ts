import { NextRequest, NextResponse } from "next/server";
import { queryDbRest } from "../../../../client/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const result = await queryDbRest("item", `content_type=eq.project&body->>urlSlug=eq.${id}`);
  const data = result[0];
  return NextResponse.json(data);
}
