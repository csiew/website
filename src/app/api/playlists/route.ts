import { NextRequest, NextResponse } from "next/server";
import { PlaylistData } from "../../../lib/playlists";
import rawPlaylistData from "./playlists.json";

export async function GET(request: NextRequest) {
  const playlists = (rawPlaylistData as PlaylistData).collection.flatMap((group) => group.playlists.special);
  return NextResponse.json({ playlists });
}
