import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../../../store/store'
import { toggleGenreFilter, beginUiTask, endUiTask } from '../../../../../store/app-slice'
import buttonStyles from '../../../../../components/button/Button.module.css'
import styles from './FiltersButton.module.css'

const MOVIE_GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
]

export const FiltersButton = () => {
  const dispatch = useDispatch<AppDispatch>()
  const selectedGenres = useSelector((state: RootState) => state.films.selectedGenres)

  const handleGenreClick = (genreId: number) => {
    dispatch(beginUiTask())
    dispatch(toggleGenreFilter(genreId))
    requestAnimationFrame(() => dispatch(endUiTask()))
  }

  return (
    <div className={styles.buttonsWrap}>
      {MOVIE_GENRES.map((genre) => {
        const isActive = selectedGenres.includes(genre.id)

        return (
          <button
            key={genre.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => handleGenreClick(genre.id)}
            className={`${buttonStyles.button} ${styles.genreButton} ${isActive ? buttonStyles.active : ''}`}
          >
            {genre.name}
          </button>
        )
      })}
    </div>
  )
}