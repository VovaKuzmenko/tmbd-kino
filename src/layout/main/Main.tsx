import styled from 'styled-components'
import { FlexWrapper } from "../../components/FlexWrapper"
import { Search } from "../../components/search/Search"
// import photo from "..."

export const Main = () => {
  return (
    <StyledMain>
      <FlexWrapper align={"center"} justify={"space-around"}>
        <h2>WELCOME</h2>
        <h1>Browse highlighted titles from TMDB</h1>
        <Search />
        <img src="" alt="картинка на весь экран" />
      </FlexWrapper>
    </StyledMain>
  )
}

const StyledMain = styled.div`
min-height: 100vh;
`