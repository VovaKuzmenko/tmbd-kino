import { WelcomeBlock } from "../WelcomeBlock"
import { Rubric } from "../rubric/Rubric"
import type { FilmCategory } from "../../../components/types"

type RubricItem = {
  title: string
  category: FilmCategory
}

type MenuMainProps = {
  rubrics: RubricItem[]
}

export const MenuMain = ({ rubrics }: MenuMainProps) => {

  return (
    <div>
      <WelcomeBlock />
      {rubrics.map((rubric) => (
        <Rubric key={rubric.category} title={rubric.title} category={rubric.category} />
      ))}
    </div>
  )
}


