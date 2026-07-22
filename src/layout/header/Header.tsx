import { Logo } from '../../components/logo/Logo'
import { Menu } from '../../components/menu/Menu'
import styled from 'styled-components'
import { ButtonDayNight } from './buttondaynight/ButtonDayNight'

export const Header = () => {
  return (
    <StyledHeader>
      <Logo />
      <Menu />
      <ButtonDayNight />
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px 24px;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
`