import styled from 'styled-components'
import styles from './rubric.module.css'
import { FlexWrapper } from '../../../components/FlexWrapper'
import { MuviesHeaderRubric } from '../rubric/rubricheadermovies/RubricHeaderMovies'
import { RubricFilms } from '../../../components/rubricfilms/RubricFilms'


// тут название рубрики, и кнопка
// 6 картинок - внизу рецтинг (виден постоянно),  в верху при наведении появляется сердечко в кружочке, которое можно отметить как любимый фильм (подсветка кружочка при наведении и изменение цвета кружочка при клике)





export const Rubric = () => {

  return (
    <FlexWrapper>
      <StyledRubric className={styles['StyledRubric']}>
        <MuviesHeaderRubric />
        <RubricFilms />
      </StyledRubric >
    </FlexWrapper>
  )
}

const StyledRubric = styled.section`

`