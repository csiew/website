export interface Show {
  name: string;
  imdbId: string;
  watching?: boolean;
  recommended?: boolean;
  metadata?: Partial<OmdbResponse>;
  details?: Partial<OmdbResponse>;
}

export interface ShowsData {
  shows: Array<Show>;
  current: Array<string>;
}

// Remember to wrap with Partial<>
export interface OmdbResponse {
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  totalSeasons?: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  [k: string]: any;
}
