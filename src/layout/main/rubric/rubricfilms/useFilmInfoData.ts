import { useEffect, useState } from 'react'
import {
  getFilmInfoBundle,
  type CastMember,
  type FilmDetails,
  type SimilarMovie,
} from '../../../../api/filmInfoApi'
import { createInitialRequestState, type RequestState } from '../../../../Error/error.ts'
import { pushRequestErrorToast } from '../../../../shared/notifications'

type FilmInfoData = {
  film: FilmDetails | null
  cast: CastMember[]
  similar: SimilarMovie[]
}

const initialData: FilmInfoData = {
  film: null,
  cast: [],
  similar: [],
}

export const useFilmInfoData = (movieId: string) => {
  const [request, setRequest] = useState<RequestState<FilmInfoData>>(
    createInitialRequestState(initialData)
  )

  useEffect(() => {
    let isActive = true

    const fetchData = async () => {
      setRequest((prev) => ({
        ...prev,
        isLoading: true,
        isError: false,
        error: null,
      }))

      try {
        const data = await getFilmInfoBundle(movieId)
        if (!isActive) return

        setRequest({
          data: {
            film: data.film,
            cast: data.cast,
            similar: data.similar,
          },
          isLoading: false,
          isError: false,
          error: null,
        })
      } catch (error: unknown) {
        if (!isActive) return

        setRequest({
          data: initialData,
          isLoading: false,
          isError: true,
          error: pushRequestErrorToast(error, 'Failed to fetch film info', 'Ошибка фильма'),
        })
      }
    }

    void fetchData()

    return () => {
      isActive = false
    }
  }, [movieId])

  return {
    film: request.data.film,
    cast: request.data.cast,
    similar: request.data.similar,
    isLoading: request.isLoading,
    isError: request.isError,
    error: request.error,
  }
}