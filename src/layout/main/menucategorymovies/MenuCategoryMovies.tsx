import { RubricTabulation } from "./rubrictabulation/RubricTabulation"
import { Rubric } from "../rubric/Rubric"
import { Pagination } from "../../../components/pagination/Pagination"

export const MenuCategoryMuvies = () => {
  return (
    <div>
      <RubricTabulation />
      <Rubric />
      {/* <Rubric /> */}
      {/* <Rubric /> */}
      {/* <Rubric /> */}
      <Pagination />
    </div>
  )
}