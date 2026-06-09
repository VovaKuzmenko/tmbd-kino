import { Button } from "../../../../components/button/Button"
import styles from './RubricTabulation.module.css'
// import type { RubricItem } from "../../../components/types"
import type { RubricItem } from "../../../../components/types"

type RubricTabulationsProps = {
  rubrics: RubricItem[]
}

export const RubricTabulation = ({ rubrics }: RubricTabulationsProps) => {
  return (
    <div className={styles["RubricTabulation__positional__properties"]}>
      {rubrics.map((rubric) => (
        <Button key={rubric.category} title={rubric.title} category={rubric.category} />
      ))}
    </div>
  )
}