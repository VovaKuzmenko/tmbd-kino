import { useEffect, useState } from 'react'
import { getFilmInfoBundle, type CastMember, type FilmDetails, type SimilarMovie } from '../../../../api/filmInfoApi'

export type ErrorState = {
  code: string
  message: string
} | null

export const useFilmInfoData = (movieId: string) => {
  const [film, setFilm] = useState<FilmDetails | null>(null)
  const [cast, setCast] = useState<CastMember[]>([])
  const [similar, setSimilar] = useState<SimilarMovie[]>([])
  const [error, setError] = useState<ErrorState>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let isActive = true

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await getFilmInfoBundle(movieId)
        if (!isActive) return

        setFilm(data.film)
        setCast(data.cast)
        setSimilar(data.similar)
      } catch (err) {
        if (!isActive) return
        const message = err instanceof Error ? err.message : 'Unknown error'
        setError({ code: 'fetch_error', message })
      } finally {
        if (isActive) setIsLoading(false)
      }
    }

    void fetchData()

    return () => {
      isActive = false
    }
  }, [movieId])

  return { film, cast, similar, error, isLoading }
}