import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type * as Types from './../../../../components/types/types'
import instance, { IMG_BASE_URL } from './../../../../components/instance/instance'
import styles from './FilmInfo.module.css'

type FilmDetails = Omit<Types.BaseFilmResponse, 'genre_ids' | 'poster_path'> & {
  poster_path: string | null
  runtime: number | null
  genres: Array<{ id: number; name: string }>
}

type CastMember = {
  id: number
  name: string
  character: string
  profile_path: string | null
}

type CreditsResponse = {
  cast: CastMember[]
}

type SimilarMovie = Omit<Types.BaseFilmResponse, 'poster_path'> & {
  poster_path: string | null
}

type SimilarResponse = {
  results: SimilarMovie[]
}

type ErrorState = {
  code: string
  message: string
} | null

const NO_POSTER_URL = 'https://placehold.co/300x450?text=No+Poster'
const NO_AVATAR_URL = 'https://placehold.co/120x120?text=No+Photo'

const buildImageUrl = (path: string | null, size: 'w185' | 'w342') => {
  if (!path) return size === 'w185' ? NO_AVATAR_URL : NO_POSTER_URL
  return IMG_BASE_URL + '/' + size + path
}

const formatRuntime = (minutes: number | null) => {
  if (!minutes || minutes <= 0) return '—'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return String(m) + ' мин'
  return String(h) + ' ч ' + String(m) + ' мин'
}

export const FilmInfo = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const movieId = id ?? '278'

  const [film, setFilm] = useState<FilmDetails | null>(null)
  const [cast, setCast] = useState<CastMember[]>([])
  const [similar, setSimilar] = useState<SimilarMovie[]>([])
  const [error, setError] = useState<ErrorState>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let isActive = true

    const fetchFilmInfo = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const [filmResponse, creditsResponse, similarResponse] = await Promise.all([
          instance.get<FilmDetails>('/' + movieId),
          instance.get<CreditsResponse>('/' + movieId + '/credits'),
          instance.get<SimilarResponse>('/' + movieId + '/similar'),
        ])

        if (!isActive) return

        setFilm(filmResponse.data)
        setCast((creditsResponse.data.cast ?? []).slice(0, 8))
        setSimilar((similarResponse.data.results ?? []).slice(0, 6))
      } catch (err) {
        if (!isActive) return
        const message = err instanceof Error ? err.message : 'Unknown error'
        setError({ code: 'fetch_error', message })
      } finally {
        if (isActive) setIsLoading(false)
      }
    }

    void fetchFilmInfo()

    return () => {
      isActive = false
    }
  }, [movieId])

  const releaseDate = useMemo(() => {
    if (!film?.release_date) return '—'
    const date = new Date(film.release_date)
    if (Number.isNaN(date.getTime())) return '—'
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }, [film?.release_date])

  const rating = useMemo(() => {
    if (!film) return '—'
    return Number.isFinite(film.vote_average) ? film.vote_average.toFixed(1) : '—'
  }, [film])

  const genres = useMemo(() => {
    if (!film?.genres?.length) return '—'
    return film.genres.map((g) => g.name).join(', ')
  }, [film])

  if (isLoading && !film) {
    return (
      <section className={styles.page}>
        <p className={styles.loading}>Загрузка фильма...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className={styles.page}>
        <div className={styles.errorBox}>
          <p>Ошибка: {error.code}</p>
          <p>{error.message}</p>
        </div>
      </section>
    )
  }

  if (!film) {
    return (
      <section className={styles.page}>
        <p className={styles.loading}>Фильм не найден.</p>
      </section>
    )
  }

  const posterSrc = buildImageUrl(film.poster_path, 'w342')

  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.posterWrap}>
          <img
            className={styles.posterImage}
            src={posterSrc}
            alt={film.title}
            onError={(event) => {
              event.currentTarget.src = NO_POSTER_URL
            }}
          />
        </div>

        <div className={styles.info}>
          <div className={styles.topRow}>
            <h1 className={styles.title}>{film.title}</h1>
            <button
              type="button"
              className={styles.backButton}
              onClick={() => navigate(-1)}
            >
              Назад
            </button>
          </div>

          <div className={styles.meta}>
            <span>Дата релиза: {releaseDate}</span>
            <span>Рейтинг: {rating}</span>
            <span>Длительность: {formatRuntime(film.runtime)}</span>
          </div>

          <p className={styles.overview}>
            {film.overview?.trim() ? film.overview : 'Описание пока отсутствует.'}
          </p>

          <p className={styles.genres}>
            <strong>Жанры:</strong> {genres}
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Актеры</h2>
        <div className={styles.castGrid}>
          {cast.length === 0 && <p className={styles.emptyText}>Список актеров пока пуст.</p>}

          {cast.map((actor) => (
            <article className={styles.castCard} key={actor.id}>
              <img
                className={styles.castAvatar}
                src={buildImageUrl(actor.profile_path, 'w185')}
                alt={actor.name}
                onError={(event) => {
                  event.currentTarget.src = NO_AVATAR_URL
                }}
              />
              <div>
                <p className={styles.castName}>{actor.name}</p>
                <p className={styles.castRole}>{actor.character || 'Роль не указана'}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Похожие фильмы</h2>
        <div className={styles.similarGrid}>
          {similar.length === 0 && <p className={styles.emptyText}>Похожие фильмы не найдены.</p>}

          {similar.map((movie) => (
            <article className={styles.similarCard} key={movie.id}>
              <Link to={'/film_info/' + movie.id} className={styles.similarLink}>
                <img
                  className={styles.similarPoster}
                  src={buildImageUrl(movie.poster_path, 'w342')}
                  alt={movie.title}
                  onError={(event) => {
                    event.currentTarget.src = NO_POSTER_URL
                  }}
                />
                <div className={styles.similarBody}>
                  <h3 className={styles.similarTitle}>{movie.title}</h3>
                  <span className={styles.similarRating}>
                    {Number.isFinite(movie.vote_average) ? movie.vote_average.toFixed(1) : '—'}
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}