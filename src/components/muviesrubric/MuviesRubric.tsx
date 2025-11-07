
import { Title as RubricTitle } from "../title/Title"
import { Button as RubricButton } from "../button/Button"

// верхняя часть с кнопкой и рубрикой в разделе майн


export const MuviesHeaderRubric = () => {
  return (
    <div>
      <RubricTitle />
      <RubricButton />
    </div>
  )
}