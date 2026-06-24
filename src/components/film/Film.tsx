import styled from 'styled-components'
import { Like as FilmCartLike } from "../like/Like"
import { Picture as FilmCartPicture } from "../picture/Picture"
import { Reiting as FilmCartReiting } from "../reiting/Reiting"
import { NavLink } from 'react-router-dom'
import { PATHS } from './../../constans/path'

import type { BaseFilmResponse } from '../types'

type FilmProps = {
  movie: BaseFilmResponse
  isFavorite: boolean
  onToggleFavorite: () => void
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export const Film = ({ movie, isFavorite, onToggleFavorite }: FilmProps) => {
  const posterUrl = movie.poster_path
    ? IMAGE_BASE_URL + movie.poster_path
    : 'https://via.placeholder.com/300x450?text=No+Poster'


  return (
    <StyledNavLink to={PATHS.FILM_INFO}>
      <FilmCart>
        <LikeButtonWrap
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            onToggleFavorite()
          }}
        >
          <FilmCartLike active={isFavorite} />
        </LikeButtonWrap>

        <FilmCartPicture src={posterUrl} alt={movie.title} />

        <BottomRow>
          <Title>{movie.title}</Title>
          <FilmCartReiting value={movie.vote_average} />
        </BottomRow>
      </FilmCart>
    </StyledNavLink>

  )
}

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`

const FilmCart = styled.section`
  width: 220px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  border: 1px solid #2b2b2b;
  background-color: #121212;
`

const LikeButtonWrap = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
`

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 10px;
`

const Title = styled.h3`
  margin: 0;
  font-size: 14px;
  line-height: 1.3;
  color: #ffffff;
  `