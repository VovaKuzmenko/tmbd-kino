import { RubricTabulation } from "./rubricbutton/RubricTabulation"
import { Rubric } from "../rubric/Rubric"
import { Pagination } from "../../../components/pagination/Pagination"

export const MenuCategoryMuvies = () => {
  return (
    <div>
      <RubricTabulation />
      <Rubric />
      <Pagination />
    </div>
  )
}