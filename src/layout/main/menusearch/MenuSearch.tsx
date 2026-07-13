import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { Search } from '../../../components/search/Search'
import type { BaseFilmResponse } from '../../../components/types'
import { IMG_BASE_URL } from '../../../components/instance/instance'
import styles from './MenuSearch.module.css'
import { Picture } from '../../../components/picture/Picture'
import { normalizeRequestError, type RequestError } from '../../../Error/error'
import { searchResponseSchema } from '../../../api/schemas'
import { parseApiResponse } from '../../../api/validateResponse'


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
    }
  }, [])

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
          <div className={styles.grid}>
            {movies.map((movie) => (
              <article key={movie.id} className={styles.card}>
                <Picture
                  src={movie.poster_path ? `${IMG_BASE_URL} / w342${movie.poster_path}` : '/no-poster.svg'}
                  alt={movie.title}
                  fallbackSrc="/no-poster.svg"
                  className={styles.poster}
                />

                <div className={styles.cardBody}>
                  <h3 className={styles.movieTitle}>{movie.title}</h3>
                  <p className={styles.meta}>Release: {movie.release_date || 'Unknown'}</p>
                  <p className={styles.meta}>Rating: {movie.vote_average.toFixed(1)}</p>
                </div>
              </article>
            ))}
          </div>

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