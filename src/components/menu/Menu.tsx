
import styled from 'styled-components'



export const Menu = () => {
  return (
    <StyledMenu>
      <ul>
        <li><a href="">Main</a></li>
        <li><a href="">Categori movies</a></li>
        <li><a href="">Filtered movies</a></li>
        <li><a href="">Search</a></li>
        <li><a href="">Favorites</a></li>
      </ul>
    </StyledMenu>


  )
}

// не забываем импортировать библиотеки и 
// при работе с TypeScript,  также установить типы
const StyledMenu = styled.nav`
ul {
display: flex;
gap: 30px;
}
`