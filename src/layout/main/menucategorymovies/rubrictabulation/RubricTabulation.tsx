import { Button } from "../../../../components/button/Button"
import styles from './RubricTabulation.module.css'



export const RubricTabulation = () => {
  return (
    <div className={styles["RubricTabulation__positional__properties"]}>
      <Button showButton={true} />
      <Button showButton={true} />
      <Button showButton={true} />
      <Button showButton={true} />
    </div>
  )
}