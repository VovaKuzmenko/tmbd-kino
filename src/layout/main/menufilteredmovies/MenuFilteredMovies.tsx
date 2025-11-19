import { FlexWrapper } from "../../../components/FlexWrapper"
import { Rubric } from "../rubric/Rubric"
import { Pagination } from "../../../components/pagination/Pagination"
import { FiltersSort } from "./filterssort/fFilterSort"
import styles from './MenuFilteredMovies.module.css'

export const MenuFilteredMovies = () => {
  return (
    <div className={styles['MenuFilteredMovies__positional__properties']}>
      {/* Тут подумать как задать пропорциональные размеры для флексов */}
      <FiltersSort />
      {/* <ObertkaDlaFlexa> */}
      <Rubric />
      <Pagination />
      {/* </ObertkaDlaFlexa> */}
    </div>
  )
}