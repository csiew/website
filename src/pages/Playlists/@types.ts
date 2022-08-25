export interface Playlist {
  name: string;
  url: string;
}

export interface PlaylistGroup {
  id: string;
  name: string;
  playlists: {
    standard: Array<Playlist>;
    special: Array<Playlist>;
  };
}

export interface PlaylistData {
  collection: Array<PlaylistGroup>;
}
