import { useDispatch, useSelector } from 'react-redux'
import { Film } from "../film/Film"
import styles from './rubricfilm.module.css'

import { toggleFavorite } from '../../store/app-slice'
import type { AppDispatch, RootState } from '../../store/store'
import type { BaseFilmResponse } from '../types'

type RubricFilmsProps = {
  movies: BaseFilmResponse[]
}

export const RubricFilms = ({ movies }: RubricFilmsProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const favorites = useSelector((state: RootState) => state.films.favorites)
  return (
    <div className={styles['positional__properties']}>
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
