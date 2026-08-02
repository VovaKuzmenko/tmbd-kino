
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { menuItems } from '../../constans/path'


// TODO что-то не работает - ошибка, скорее всего
// TODO дело в том, что не используются те же объекты в App



export const Menu = () => {
  return (
    // не забыть сделать нормальную стилизацию (активня ссылка, и обычные слили для li и NavLink
    <StyledMenu>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <NavLink to={item.path}>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </StyledMenu>


  )
}

const StyledMenu = styled.nav`
ul {
list-style: none;
display: flex;
gap: 30px;
}

li::before {
  content: "|| ";   
  letter-spacing: 2px; 
  margin-right: 20px; 
  color: #007bff;    
}
`