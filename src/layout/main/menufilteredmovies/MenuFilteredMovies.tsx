import { Rubric } from "../rubric/Rubric"
import { FiltersSort } from "./filterssort/fFilterSort"
import styles from './MenuFilteredMovies.module.css'

export const MenuFilteredMovies = () => {
  return (
    <section className={styles.layout}>
      <aside className={styles.sidebar}>
        <FiltersSort />
      </aside>

      <div className={styles.content}>
        <Rubric title="" moviesLimit={20} />
      </div>
    </section>
  )
}