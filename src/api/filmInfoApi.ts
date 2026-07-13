import instance from '../components/instance/instance'
import type * as Types from '../components/types/types'

export type FilmDetails = Omit<Types.BaseFilmResponse, 'genre_ids' | 'poster_path'> & {
  poster_path: string | null
  runtime: number | null
  genres: Array<{ id: number; name: string }>
}

export type CastMember = {
  id: number
  name: string
  character: string
  profile_path: string | null
}

export type SimilarMovie = Omit<Types.BaseFilmResponse, 'poster_path'> & {
  poster_path: string | null
}

type CreditsResponse = {
  cast: CastMember[]
}

type SimilarResponse = {
  results: SimilarMovie[]
}

export type FilmInfoBundle = {
  film: FilmDetails
  cast: CastMember[]
  similar: SimilarMovie[]
}

export const getFilmInfoBundle = async (movieId: string): Promise<FilmInfoBundle> => {
  const [filmResponse, creditsResponse, similarResponse] = await Promise.all([
    instance.get<FilmDetails>('/' + movieId),
    instance.get<CreditsResponse>('/' + movieId + '/credits'),
    instance.get<SimilarResponse>('/' + movieId + '/similar'),
  ])

  return {
    film: filmResponse.data,
    cast: (creditsResponse.data.cast ?? []).slice(0, 8),
    similar: (similarResponse.data.results ?? []).slice(0, 6),
  }
}