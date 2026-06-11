
import type { FilmCategory } from '../types/types.ts'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../store/store.ts'
import { fetchFilms } from "../../store/app-slice"




{/* тут продумать стили для кнопки, как передать название */ }

// const rubrics: Array<{ title: string; category: FilmCategory }> = [
//   { title: 'Popular Movies', category: 'popular' },
//   { title: 'Top Rated Movies', category: 'top_rated' },
//   { title: 'Upcoming Movies', category: 'upcoming' },
//   { title: 'Now Playing Movies', category: 'now_playing' },
// ]

type ButtonProps = {
  title: string
  category: FilmCategory
}

export const Button = ({ title, category }: ButtonProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const HanddlerButtonCategory = () => {
    dispatch(fetchFilms(category))
  }
  return (
    <div>
      <button onClick={HanddlerButtonCategory}>{title}</button>
    </div>
  )
}