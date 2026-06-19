import { useState } from 'react'
import axios from 'axios'
import { Search } from '../../../components/search/Search'
import type { BaseFilmResponse } from '../../../components/types'
import { IMG_BASE_URL } from '../../../components/instance/instance'
import styles from './MenuSearch.module.css'

type SearchResponse = {
  results: BaseFilmResponse[]
}

export const MenuSearch = () => {
  const [query, setQuery] = useState('')
  const [searchedQuery, setSearchedQuery] = useState('')
  const [movies, setMovies] = useState<BaseFilmResponse[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSearch = async () => {
    const normalizedQuery = query.trim()

    if (!normalizedQuery) {
      setSearchedQuery('')
      setMovies([])
      setStatus('idle')
      return
    }

    setStatus('loading')
    setSearchedQuery(normalizedQuery)

    try {
      const response = await axios.get<SearchResponse>('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          language: 'ru-RU',
          query: normalizedQuery,
          include_adult: false,
          page: 1,
        },
      })

      setMovies(response.data.results ?? [])
      setStatus('success')
    } catch {
      setMovies([])
      setStatus('error')
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Search Results</h2>

      <Search
        value={query}
        onChange={setQuery}
        onSubmit={handleSearch}
        isLoading={status === 'loading'}
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
      )}
    </div>
  )
}