import styled from "styled-components"
import { Film } from "../film/Film"
styled
import styles from './rubricfilm.module.css'


export const RubricFilms = () => {
  return (
    // тут как-то промепить фильмы и разместить их по 5 или по 6 штук
    <div className={styles['positional__properties']}>
      <Film />
      {/* <Route path={PATHS.MAIN} element={<MenuMain />}  */}
      <Film />
      <Film />
      <Film />
      <Film />
    </div>
  )
}

// const RubricFilms = styled.section`

// `