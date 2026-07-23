import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import { Search } from '../../../components/search/Search'
import type { BaseFilmResponse } from '../../../components/types'
import styles from './MenuSearch.module.css'
import { normalizeRequestError, type RequestError } from '../../../Error/error'
import { searchResponseSchema } from '../../../api/schemas'
import { parseApiResponse } from '../../../api/validateResponse'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../../store/store'
import { beginExternalRequest, endExternalRequest } from '../../../store/app-slice'
import { RubricFilms } from '../../../components/rubricfilms/RubricFilms'


const SKELETON_CARDS_COUNT = 8

export const MenuSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [query, setQuery] = useState('')
  const [searchedQuery, setSearchedQuery] = useState('')
  const [movies, setMovies] = useState<BaseFilmResponse[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState<RequestError | null>(null)

  const queryFromUrl = (searchParams.get('q') ?? '').trim()

  const dispatch = useDispatch<AppDispatch>()

  const resetSearchState = () => {
    setSearchedQuery('')
    setMovies([])
    setStatus('idle')
    setPage(1)
    setTotalPages(1)
    setError(null)
  }

  const fetchMovies = useCallback(async (searchValue: string, targetPage: number) => {
    setStatus('loading')
    setError(null)
    dispatch(beginExternalRequest())

    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          language: 'ru-RU',
          query: searchValue,
          include_adult: false,
          page: targetPage,
        },
      })
      const parsed = parseApiResponse(searchResponseSchema, response.data)

      setMovies(parsed.results ?? [])
      setPage(parsed.page ?? targetPage)
      setTotalPages(Math.max(1, parsed.total_pages ?? 1))
      setStatus('success')
    } catch (error: unknown) {
      const normalizedError = normalizeRequestError(error, 'Не удалось загрузить результаты поиска')
      setMovies([])
      setStatus('error')
      setError(normalizedError)
    } finally {
      dispatch(endExternalRequest())
    }
  }, [dispatch])

  useEffect(() => {
    setQuery(queryFromUrl)

    if (!queryFromUrl) {
      resetSearchState()
      return
    }

    setSearchedQuery(queryFromUrl)
    void fetchMovies(queryFromUrl, 1)
  }, [queryFromUrl, fetchMovies])

  const handlePageChange = async (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return
    await fetchMovies(searchedQuery, nextPage)
  }

  const handleInputClear = () => {
    setSearchParams({})
  }

  const handleSearch = async () => {
    const normalizedQuery = query.trim()

    if (!normalizedQuery) {
      setSearchParams({})
      return
    }

    if (normalizedQuery === queryFromUrl) {
      await fetchMovies(normalizedQuery, 1)
      return
    }

    setSearchParams({ q: normalizedQuery })
  }

  const canGoPrev = page > 1
  const canGoNext = page < totalPages

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Search Results</h2>

      <Search
        value={query}
        onChange={setQuery}
        onSubmit={handleSearch}
        isLoading={status === 'loading'}
        onClear={handleInputClear}
      />

      {status === 'idle' && (
        <p className={styles.hint}>Enter a movie title to start searching.</p>
      )}

      {status === 'loading' && (
        <div className={styles.grid}>
          {Array.from({ length: SKELETON_CARDS_COUNT }).map((_, index) => (
            <article key={index} className={styles.card}>
              <Skeleton className={styles.posterSkeleton} />
              <div className={styles.cardBody}>
                <Skeleton height={20} width="76%" />
                <Skeleton height={14} width="52%" style={{ marginTop: 8 }} />
                <Skeleton height={14} width="38%" style={{ marginTop: 6 }} />
              </div>
            </article>
          ))}
        </div>
      )}

      {status === 'error' && error && (
        <div className={styles.hint}>
          <p>{error.message}</p>
          {error.status && <p>HTTP status: {error.status}</p>}
        </div>
      )}

      {status === 'success' && movies.length === 0 && (
        <p className={styles.hint}>No matches found for "{searchedQuery}"</p>
      )}

      {status === 'success' && movies.length > 0 && (
        <>
          <RubricFilms movies={movies} columns={5} />

          <div className={styles.pagination}>
            <button
              type="button"
              className={styles.pageButton}
              onClick={() => handlePageChange(page - 1)}
              disabled={!canGoPrev}
            >
              Prev
            </button>

            <span className={styles.pageInfo}>
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              className={styles.pageButton}
              onClick={() => handlePageChange(page + 1)}
              disabled={!canGoNext}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}