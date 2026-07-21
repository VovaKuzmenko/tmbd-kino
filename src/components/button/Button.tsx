import type { FilmCategory } from '../types/types.ts'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../store/store.ts'
import { fetchFilms, setCurrentCategory } from "../../store/app-slice"

type ButtonProps = {
  title: string
  category: FilmCategory
}

export const Button = ({ title, category }: ButtonProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const HanddlerButtonCategory = () => {
    dispatch(setCurrentCategory(category))
    dispatch(fetchFilms(category))
  }

  return (
    <div>
      <button onClick={HanddlerButtonCategory}>{title}</button>
    </div>
  )
}