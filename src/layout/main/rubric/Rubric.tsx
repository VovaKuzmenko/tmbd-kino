import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilms } from './../../../store/app-slice'
import type { AppDispatch, RootState } from "./../../../store/store"

import styled from 'styled-components'
import styles from './rubric.module.css'
import { FlexWrapper } from '../../../components/FlexWrapper'
import { MuviesHeaderRubric } from '../rubric/rubricheadermovies/RubricHeaderMovies'
import { RubricFilms } from '../../../components/rubricfilms/RubricFilms'
import { RubricFilmsSkeleton } from '../../../components/rubricfilms/RubricFilmsSkeleton'
import type { FilmCategory } from './../../../components/types'

type RubricProps = {
  title: string
  category?: FilmCategory
}

export const Rubric = ({ title, category }: RubricProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const movies = useSelector((state: RootState) => state.films.filteredFilms)
  const status = useSelector((state: RootState) => state.films.status)
  const error = useSelector((state: RootState) => state.films.error)

  useEffect(() => {
    if (!category) return
    dispatch(fetchFilms(category))
  }, [dispatch, category])

  const isLoading = status === 'loading'

  return (
    <FlexWrapper>
      <StyledRubric className={styles['StyledRubric']}>
        <MuviesHeaderRubric title={title} />


        {isLoading && <RubricFilmsSkeleton count={6} />}


        {!isLoading && error && ( // ИЗМЕНЕНО
          <div>
            <div>Ошибка: {error.message}</div>
            {error.status && <div>HTTP status: {error.status}</div>}
          </div>
        )}


        {!isLoading && !error && movies.length === 0 && <div>No movies</div>}

        {!isLoading && movies.length > 0 && <RubricFilms movies={movies.slice(0, 6)} />}
      </StyledRubric>
    </FlexWrapper>
  )
}

const StyledRubric = styled.section``