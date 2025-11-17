import { FlexWrapper } from "../../../components/FlexWrapper"
import { Rubric } from "../rubric/Rubric"
import { Pagination } from "../../../components/pagination/Pagination"
import { FiltersSort } from "./filterssort/fFilterSort"

export const MenuFilteredMovies = () => {
  return (
    <div>
      <FlexWrapper>
        <FiltersSort />
        <Rubric />
        <Pagination />
      </FlexWrapper>
    </div>
  )
}