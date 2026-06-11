import { Button } from "../../../../components/button/Button"
import styles from './RubricHeaderMovies.module.css'

type MuviesHeaderRubricProps = {
  title: string
}

export const MuviesHeaderRubric = ({ title }: MuviesHeaderRubricProps) => {
  return (
    <div className={styles["MuviesHeaderRubric"]}>
      <h3>{title}</h3>
    </div>
  )
}