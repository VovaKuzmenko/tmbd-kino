import { z } from 'zod'

const nullableStringToEmpty = z.string().nullable().transform((value) => value ?? '')

export const baseFilmSchema = z.object({
  adult: z.boolean(),
  backdrop_path: nullableStringToEmpty,
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: nullableStringToEmpty,
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
})

export const filmListResponseSchema = z.object({
  results: z.array(baseFilmSchema),
})

export const searchResponseSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  results: z.array(baseFilmSchema),
})

export const filmDetailsSchema = z.object({
  adult: z.boolean(),
  backdrop_path: nullableStringToEmpty,
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
  runtime: z.number().nullable(),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
})

export const castMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string(),
  profile_path: z.string().nullable(),
})

export const creditsResponseSchema = z.object({
  cast: z.array(castMemberSchema),
})

export const similarMovieSchema = baseFilmSchema.extend({
  poster_path: z.string().nullable(),
})

export const similarResponseSchema = z.object({
  results: z.array(similarMovieSchema),
})