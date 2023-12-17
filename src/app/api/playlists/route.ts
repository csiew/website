import { NextRequest, NextResponse } from "next/server";
import { getPlaylists } from "../../../services/playlists";

export async function GET(request: NextRequest) {
  const playlists = getPlaylists();
  return NextResponse.json({ playlists });
}
