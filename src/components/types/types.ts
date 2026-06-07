

// => instead of movie
export type BaseFilmResponse<T = {}> = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
} & T

// ИЗ Rubric.js , filmInfo => similar
// --------------------------------------*/
export type Error = {
  code: string;
  message: string;
  name: boolean;
}

export type FilmCategory = 'popular' | 'top_rated' | 'upcoming' | 'now_playing'
// -------------------------------------------/
// filmInfo.js
// -------------------------------------------/


export type BaseWorkingFilm = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
}

export type Cast = BaseWorkingFilm & {
  cast_id: number;
  character: string;
  order: number;
}

export type Crew = BaseWorkingFilm & {
  department: string;
  job: string;
}

