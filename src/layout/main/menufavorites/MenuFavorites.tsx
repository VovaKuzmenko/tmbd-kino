import { FlexWrapper } from "../../../components/FlexWrapper"

export const MenuSearch = () => {
  return (
    <div>
      <FlexWrapper>
        {/* этот текст, если фильм не выбран или выбраные фильмы */}
        <h3>Favorites</h3>
        <p>Add movies to favorites to see them on this page.</p>
      </FlexWrapper>
    </div>
  )
}