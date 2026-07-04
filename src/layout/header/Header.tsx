// import React from "react";
import { Logo } from '../../components/logo/Logo'
import { Menu } from '../../components/menu/Menu'
import styled from 'styled-components'
import { ButtonDayNight } from './buttondaynight/ButtonDayNight'


export const Header = () => {
  return (
    <StyledHeader>
      {/* <StyledHeader> */}
      <Logo />
      <Menu />
      <ButtonDayNight />
      {/* </StyledHeader> */}
    </StyledHeader>
  )
}

// перенести в отдельный ЦСС модуль
const StyledHeader = styled.header`
position: sticky;
  top: 0;
  z-index: 1000;
display:flex;
justify-content:space-between;
`
