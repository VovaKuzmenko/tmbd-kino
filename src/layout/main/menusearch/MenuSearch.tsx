import { useState } from 'react'
import axios from 'axios'
import { Search } from '../../../components/search/Search'
import type { BaseFilmResponse } from '../../../components/types'
import { IMG_BASE_URL } from '../../../components/instance/instance'
import styles from './MenuSearch.module.css'

type SearchResponse = {
  page: number
  total_pages: number
  results: BaseFilmResponse[]
}

export const MenuSearch = () => {
  const [query, setQuery] = useState('')
  const [searchedQuery, setSearchedQuery] = useState('')
  const [movies, setMovies] = useState<BaseFilmResponse[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const resetSearchState = () => {
    setSearchedQuery('')
    setMovies([])
    setStatus('idle')
    setPage(1)
    setTotalPages(1)
  }

  const fetchMovies = async (searchValue: string, targetPage: number) => {
    setStatus('loading')

    try {
      const response = await axios.get<SearchResponse>('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          language: 'ru-RU',
          query: searchValue,
          include_adult: false,
          page: targetPage,
        },
      })

      setMovies(response.data.results ?? [])
      setPage(response.data.page ?? targetPage)
      setTotalPages(Math.max(1, response.data.total_pages ?? 1))
      setStatus('success')
    } catch {
      setMovies([])
      setStatus('error')
    }
  }

  const handlePageChange = async (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return
    await fetchMovies(searchedQuery, nextPage)
  }

  const handleInputClear = () => {
    setQuery('')
    resetSearchState()
  }



  const handleSearch = async () => {
    const normalizedQuery = query.trim()

    if (!normalizedQuery) {
      resetSearchState()
      return
    }

    setSearchedQuery(normalizedQuery)
    await fetchMovies(normalizedQuery, 1)
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

      {status === 'error' && (
        <p className={styles.hint}>Failed to fetch movies. Please try again.</p>
      )}

      {status === 'success' && movies.length === 0 && (
        <p className={styles.hint}>No matches found for "{searchedQuery}"</p>
      )}

      {status === 'success' && movies.length > 0 && (
        <>
          <div className={styles.grid}>
            {movies.map((movie) => (
              <article key={movie.id} className={styles.card}>
                {movie.poster_path ? (
                  <img
                    src={`${IMG_BASE_URL}/w342${movie.poster_path}`}
                    alt={movie.title}
                    className={styles.poster}
                  />
                ) : (
                  <div className={styles.noPoster}>No poster</div>
                )}

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
            // disabled={!canGoPrev || status === 'loading'}
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
            // disabled={!canGoNext || status === 'loading'}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}