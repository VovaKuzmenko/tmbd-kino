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

const StyledHeader = styled.header`
backround-color: #d4ffd3;
display:flex;
justify-content:space-between;
`
