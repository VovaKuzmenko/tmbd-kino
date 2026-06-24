
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilms } from './../../../store/app-slice'
import type { AppDispatch, RootState } from "./../../../store/store"

import styled from 'styled-components'
import styles from './rubric.module.css'
import { FlexWrapper } from '../../../components/FlexWrapper'
import { MuviesHeaderRubric } from '../rubric/rubricheadermovies/RubricHeaderMovies'
import { RubricFilms } from '../../../components/rubricfilms/RubricFilms'
import type { FilmCategory } from './../../../components/types'

type RubricProps = {
  title: string
  category: FilmCategory
}

export const Rubric = ({ title, category }: RubricProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const movies = useSelector((state: RootState) => state.films.filteredFilms)
  const status = useSelector((state: RootState) => state.films.status)
  const error = useSelector((state: RootState) => state.films.error)


  useEffect(() => {
    dispatch(fetchFilms(category))
  }, [dispatch, category])

  return (
    <FlexWrapper>
      <StyledRubric className={styles['StyledRubric']}>
        <MuviesHeaderRubric title={title} />
        {status === 'loading' && <div>loading...</div>}
        {error && <div>Ошибка: {error}</div>}
        {status === 'succeeded' && movies.length === 0 && <div>No movies</div>}
        {status === 'succeeded' && movies.length > 0 && <RubricFilms movies={movies.slice(0, 6)} />}
      </StyledRubric >
    </FlexWrapper>
  )
}

const StyledRubric = styled.section``