import styled from 'styled-components'
import styles from './WelcomeBlock.module.css'
// ./WelcomeBlock.module.css


import { Search } from "../../components/search/Search"
// import photo from "..."

export const WelcomeBlock = () => {
  return (
    <StyledMain>

      <h2>WELCOME</h2>
      <h1>Browse highlighted titles from TMDB</h1>
      <Search />
      <img src="" alt="картинка на весь экран" />
    </StyledMain>
  )
}

const StyledMain = styled.div`
min-height: 100vh;
`