import styled from 'styled-components'
import { Like as FilmCartLike } from "../like/Like"
import { Picture as FilmCartPicture } from "../picture/Picture"
import { Reiting as FilmCartReiting } from "../reiting/Reiting"
import { NavLink } from 'react-router-dom'
import { PATHS } from './../../constans/path'
// карточка фильма - на странице майн
{/* Карточка фильма должна содержать:

    Постер фильма
    Название фильма
    Рейтинг (с визуальным индикатором, например, цветной badge)
    Кнопку "❤️ Любимые" для добавления в избранное
    При нажатии на фильм пользователя должно перекинуть на отдельную страницу с фильмом, где он увидит расширенную информацию о фильме смотри 
     */}






export const Film = () => {

  // используем useParams
  // const params = useParams()
  // console.log(params)
  // todo используем "массив[Number(params.id)]"; переписать через find - если фильма такого нет, соответств. страница...
  return (
    // тут надо передать id фильма
    <NavLink to={PATHS.FILM_INFO}>
      <FilmCart>
        {/* Здесь сердечко в кружочке */}
        <FilmCartLike />

        {/* Здесь рейтинг (число кружек, цвет) */}
        <FilmCartReiting />
        {/* Здесь картинка фильма */}
        <FilmCartPicture />
      </FilmCart>
    </NavLink>
  )
}

const FilmCart = styled.section`

`