import { useDispatch, useSelector } from 'react-redux'
import { type CSSProperties } from 'react'
import { Film } from "../film/Film"
import styles from './rubricfilm.module.css'

import { toggleFavorite } from '../../store/app-slice'
import type { AppDispatch, RootState } from '../../store/store'
import type { BaseFilmResponse } from '../types'

type RubricFilmsProps = {
  movies: BaseFilmResponse[]
  columns?: number
}

export const RubricFilms = ({ movies, columns = 5 }: RubricFilmsProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const favorites = useSelector((state: RootState) => state.films.favorites)
  return (
    <div className={styles.positional__properties}
      style={{ '--cards-columns': columns } as CSSProperties}>


      {movies.map((movie) => {
        const isFavorite = favorites.some((favoriteMovie) => favoriteMovie.id === movie.id)

        return (
          <Film
            key={movie.id}
            movie={movie}
            isFavorite={isFavorite}
            onToggleFavorite={() => dispatch(toggleFavorite(movie))}
          />
        )
      })}
    </div>
  )
}
