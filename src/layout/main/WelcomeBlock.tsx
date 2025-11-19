import styled from 'styled-components'
import styles from './WelcomeBlock.module.css'
// ./WelcomeBlock.module.css


import { Search } from "../../components/search/Search"
// import photo from "..."

export const WelcomeBlock = () => {
  return (
    <StyledMain className={styles['StyledMain']}>
      <h2>WELCOME</h2>
      <h1>Browse highlighted titles from TMDB</h1>
      <Search />
      <div className={styles['welcome-Block-block__image']}>
        <img src="http://image.tmdb.org/t/p/original/pK4O03qymrXMnmaROspiy4Aycqc.jpg" alt="картинка на весь экран" />
      </div>
    </StyledMain>
  )
}

const StyledMain = styled.div`
`