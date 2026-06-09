import { RubricTabulation } from "./rubrictabulation/RubricTabulation"
import { Rubric } from "../rubric/Rubric"
import { Pagination } from "../../../components/pagination/Pagination"
import type { RubricItem } from "../../../components/types"

type MenuCategoryMuviesProps = {
  rubrics: RubricItem[]
}

export const MenuCategoryMuvies = ({ rubrics }: MenuCategoryMuviesProps) => {
  return (
    <div>

      <RubricTabulation rubrics={rubrics} />
      <Rubric />
      {/* <Rubric /> */}
      {/* <Rubric /> */}
      {/* <Rubric /> */}
      <Pagination />
    </div>
  )
}