import styled from "styled-components";

export const Footer = () => {
  return (
    <StyledFooter>
      <p>© 2025 Kinopoisk Demo · Data courtesy of TMDB.</p>
    </StyledFooter>
  )
}

// перенести в отдельный ЦСС модуль
const StyledFooter = styled.footer`
  margin-top: auto;
`;