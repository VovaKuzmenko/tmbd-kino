import { Button } from "../../../../components/button/Button"
import styles from './RubricHeaderMovies.module.css'



export const MuviesHeaderRubric = () => {
  return (
    <div className={styles['MuviesHeaderRubric']}>
      <h3>Popular Movies</h3>
      <Button showButton={false} />
    </div>
  )
}