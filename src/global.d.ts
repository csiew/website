/// <reference types="@sveltejs/kit" />

interface Project {
  id: string;
  name: string;
  timeRange: string;
  status: number;
  description: string;
  imgUrl: string;
  url: string;
  github: string;
}

interface Playlist {
  name: string;
  url: string;
}

interface PlaylistYear {
  title: string;
  playlists: {
    standard: Playlist[];
    special: Playlist[];
  }
}
