import { RubricTabulation } from "./rubrictabulation/RubricTabulation"
import { Rubric } from "../rubric/Rubric"
import { Pagination } from "../../../components/pagination/Pagination"
import type { RubricItem } from "../../../components/types"
import { useSelector } from "react-redux"
import type { RootState } from "../../../store/store"

type MenuCategoryMuviesProps = {
  rubrics: RubricItem[]
}

export const MenuCategoryMuvies = ({ rubrics }: MenuCategoryMuviesProps) => {
  const currentCategory = useSelector((state: RootState) => state.films.FilmCategory)

  const currentRubric =
    rubrics.find((r) => r.category === currentCategory) ?? rubrics[0]

  return (
    <div>

      <RubricTabulation rubrics={rubrics} />
      <Rubric title={currentRubric.title} category={currentRubric.category} />
      {/* <Rubric /> */}
      {/* <Rubric /> */}
      {/* <Rubric /> */}
      <Pagination />
    </div>
  )
}