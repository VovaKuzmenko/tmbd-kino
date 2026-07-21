import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilms } from './../../../store/app-slice'
import type { AppDispatch, RootState } from "./../../../store/store"

import styled from 'styled-components'
import styles from './rubric.module.css'
import { FlexWrapper } from '../../../components/FlexWrapper'
import { MuviesHeaderRubric } from '../rubric/rubricheadermovies/RubricHeaderMovies'
import { RubricFilms } from '../../../components/rubricfilms/RubricFilms'
import { RubricFilmsSkeleton } from '../../../components/rubricfilms/RubricFilmsSkeleton'
import type { BaseFilmResponse, FilmCategory } from './../../../components/types'

type RubricProps = {
  title: string
  category?: FilmCategory
  showMoreButton?: boolean
}

const selectRandomMovies = (movies: BaseFilmResponse[], limit: number) => {
  const shuffled = [...movies]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
      ;[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]]
  }

  return shuffled.slice(0, limit)
}

export const Rubric = ({
  title,
  category,
  showMoreButton = false,
}: RubricProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const currentCategory = useSelector((state: RootState) => state.films.FilmCategory)
  const activeCategory = category ?? currentCategory

  const categoryState = useSelector(
    (state: RootState) => state.films.filmsByCategory[activeCategory]
  )
  const filteredMovies = useSelector((state: RootState) => state.films.filteredFilms)

  const movies = category ? categoryState.items : filteredMovies
  const status = categoryState.status
  const error = categoryState.error
  const visibleMovies = useMemo(() => selectRandomMovies(movies, 6), [movies, activeCategory])

  useEffect(() => {
    if (categoryState.status !== 'idle') return
    if (categoryState.items.length > 0) return

    dispatch(fetchFilms(activeCategory))
  }, [dispatch, activeCategory, categoryState.status, categoryState.items.length])

  const isLoading = status === 'loading'

  return (
    <FlexWrapper>
      <StyledRubric className={styles['StyledRubric']}>
        <MuviesHeaderRubric
          title={title}
          category={activeCategory}
          showMoreButton={showMoreButton}
        />

        {isLoading && <RubricFilmsSkeleton count={6} />}

        {!isLoading && error && (
          <div>
            <div>Ошибка: {error.message}</div>
            {error.status && <div>HTTP status: {error.status}</div>}
          </div>
        )}

        {!isLoading && !error && movies.length === 0 && <div>No movies</div>}

        {!isLoading && movies.length > 0 && <RubricFilms movies={visibleMovies} />}
      </StyledRubric>
    </FlexWrapper>
  )
}

const StyledRubric = styled.section``