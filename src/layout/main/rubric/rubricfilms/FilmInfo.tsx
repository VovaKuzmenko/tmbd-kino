import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { IMG_BASE_URL } from './../../../../components/instance/instance'
import { useFilmInfoData } from './useFilmInfoData'
import styles from './FilmInfo.module.css'

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

const FilmInfoSkeleton = () => {
  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.posterWrap}>
          <Skeleton className={styles.posterSkeleton} />
        </div>

        <div className={styles.info}>
          <div className={styles.topRow}>
            <Skeleton height={34} width="62%" />
            <Skeleton height={36} width={90} borderRadius={10} />
          </div>

          <div className={styles.meta}>
            <Skeleton width={150} />
            <Skeleton width={110} />
            <Skeleton width={140} />
          </div>

          <p className={styles.overview}>
            <Skeleton count={4} />
          </p>

          <p className={styles.genres}>
            <Skeleton width={220} />
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Актеры</h2>
        <div className={styles.castGrid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <article className={styles.castCard} key={index}>
              <Skeleton circle width={58} height={58} />
              <div style={{ width: '100%' }}>
                <Skeleton width="70%" />
                <Skeleton width="50%" style={{ marginTop: 6 }} />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Похожие фильмы</h2>
        <div className={styles.similarGrid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <article className={styles.similarCard} key={index}>
              <Skeleton className={styles.similarPosterSkeleton} />
              <div className={styles.similarBody}>
                <Skeleton width="75%" />
                <Skeleton width={24} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export const FilmInfo = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const movieId = id ?? '278'

  const { film, cast, similar, error, isLoading } = useFilmInfoData(movieId)

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
    return <FilmInfoSkeleton />
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