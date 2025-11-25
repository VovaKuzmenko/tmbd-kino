
import styled from 'styled-components'
import { NavLink } from 'react-router'



export const Menu = () => {
  return (
    <StyledMenu>
      <ul>
        <li><NavLink to='/'>Main</NavLink></li>
        <li><NavLink to='/category'>Categori movies</NavLink></li>
        <li><NavLink to='/filtered'>Filtered movies</NavLink></li>
        <li><NavLink to='/search'>Search</NavLink></li>
        <li><NavLink to='/favorites'>Favorites</NavLink></li>
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