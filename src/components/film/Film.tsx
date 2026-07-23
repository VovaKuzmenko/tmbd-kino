import { Like as FilmCartLike } from '../like/Like'
import { Picture as FilmCartPicture } from '../picture/Picture'
import { Reiting as FilmCartReiting } from '../reiting/Reiting'
import { NavLink } from 'react-router-dom'
import { PATHS } from './../../constans/path'
import styles from './film.module.css'

import type { BaseFilmResponse } from '../types'

type FilmProps = {
  movie: BaseFilmResponse
  isFavorite: boolean
  onToggleFavorite: () => void
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const NO_POSTER_URL = 'https://placehold.co/300x450?text=No+Poster'

export const Film = ({ movie, isFavorite, onToggleFavorite }: FilmProps) => {
  const posterUrl = movie.poster_path
    ? IMAGE_BASE_URL + movie.poster_path
    : NO_POSTER_URL

  return (
    <NavLink to={`${PATHS.FILM_INFO}/${movie.id}`} className={styles.link}>
      <section className={styles.card}>
        <div
          className={styles.likeButtonWrap}
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            onToggleFavorite()
          }}
        >
          <FilmCartLike active={isFavorite} />
        </div>

        <FilmCartPicture
          src={posterUrl}
          alt={movie.title}
          fallbackSrc={NO_POSTER_URL}
          className={styles.poster}
        />

        <div className={styles.bottomRow}>
          <h3 className={styles.title}>{movie.title}</h3>
          <FilmCartReiting value={movie.vote_average} />
        </div>
      </section>
    </NavLink>
  )
}