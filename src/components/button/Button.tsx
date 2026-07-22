import { useDispatch, useSelector } from 'react-redux'
import type { FilmCategory } from '../types/types.ts'
import type { AppDispatch, RootState } from '../../store/store.ts'
import { fetchFilms, setCurrentCategory } from '../../store/app-slice'
import styles from './Button.module.css'

type ButtonProps = {
  title: string
  category: FilmCategory
}

export const Button = ({ title, category }: ButtonProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const currentCategory = useSelector((state: RootState) => state.films.FilmCategory)
  const isActive = currentCategory === category

  const handleButtonCategory = () => {
    if (currentCategory === category) return
    dispatch(setCurrentCategory(category))
    dispatch(fetchFilms(category))
  }

  return (
    <button
      type="button"
      onClick={handleButtonCategory}
      aria-pressed={isActive}
      className={`${styles.button} ${isActive ? styles.active : ''}`}
    >
      {title}
    </button>
  )
}