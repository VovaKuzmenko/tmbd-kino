import styled from 'styled-components'
import { Like as FilmCartLike } from "../like/Like"
import { Picture as FilmCartPicture } from "../picture/Picture"
import { Reiting as FilmCartReiting } from "../reiting/Reiting"

// карточка фильма - на странице майн

export const Film = () => {
  return (
    <FilmCart>
      {/* Здесь сердечко в кружочке */}
      <FilmCartLike />

      {/* Здесь рейтинг (число кружек, цвет) */}
      <FilmCartReiting />
      {/* Здесь картинка фильма */}
      <FilmCartPicture />
    </FilmCart>
  )
}

const FilmCart = styled.section`

`