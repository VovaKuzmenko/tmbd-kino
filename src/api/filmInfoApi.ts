import instance from '../components/instance/instance'
import type * as Types from '../components/types/types'
import {
  creditsResponseSchema,
  filmDetailsSchema,
  similarResponseSchema,
} from './schemas'
import { parseApiResponse } from './validateResponse'

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

export type FilmInfoBundle = {
  film: FilmDetails
  cast: CastMember[]
  similar: SimilarMovie[]
}

export const getFilmInfoBundle = async (movieId: string): Promise<FilmInfoBundle> => {
  const [filmResponse, creditsResponse, similarResponse] = await Promise.all([
    instance.get('/' + movieId),
    instance.get('/' + movieId + '/credits'),
    instance.get('/' + movieId + '/similar'),
  ])

  const film = parseApiResponse(filmDetailsSchema, filmResponse.data)
  const credits = parseApiResponse(creditsResponseSchema, creditsResponse.data)
  const similar = parseApiResponse(similarResponseSchema, similarResponse.data)

  return {
    film,
    cast: (credits.cast ?? []).slice(0, 8),
    similar: (similar.results ?? []).slice(0, 6),
  }
}