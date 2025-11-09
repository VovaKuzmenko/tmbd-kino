import { FlexWrapper } from "../../../components/FlexWrapper"
import { Rubric } from "../rubric/Rubric"
import { Pages } from "../../../components/pages/Pages"
import { FiltersSort } from "./filterssort/fFilterSort"

export const MenuFilteredMovies = () => {
  return (
    <div>
      <FlexWrapper>
        <FiltersSort />
        <Rubric />
        <Pages />
      </FlexWrapper>
    </div>
  )
}