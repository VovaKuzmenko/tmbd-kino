
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { menuItems } from '../../constans/path'


export const Menu = () => {
  return (
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