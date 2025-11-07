import styled from 'styled-components'
import { FlexWrapper } from '../../components/FlexWrapper'
import { MuviesHeaderRubric } from '../../components/title/Title'


// тут название рубрики, и кнопка
// 6 картинок - внизу рецтинг (виден постоянно),  в верху при наведении появляется сердечко в кружочке, которое можно отметить как любимый фильм (подсветка кружочка при наведении и изменение цвета кружочка при клике)

export const Rubric = () => {
  return (
    <StyledRubric>
      <FlexWrapper>
        <RubricMovies>
          <MuviesHeaderRubric />
          <RubricFilms />
        </RubricMovies>
      </FlexWrapper>
    </StyledRubric>
  )
}

const StyledRubric = styled.section`

`