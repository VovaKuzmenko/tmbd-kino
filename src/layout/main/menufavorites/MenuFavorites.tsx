import { useSelector } from 'react-redux'
import { FlexWrapper } from '../../../components/FlexWrapper'
import { RubricFilms } from '../../../components/rubricfilms/RubricFilms'
import type { RootState } from '../../../store/store'

export const MenuFavorites = () => {
  const favorites = useSelector((state: RootState) => state.films.favorites)

  return (
    <div>
      <FlexWrapper direction="column">
        <h3>Favorites</h3>

        {favorites.length === 0 ? (
          <p>Add movies to favorites to see them on this page.</p>
        ) : (
          <RubricFilms movies={favorites} columns={6} />
        )}
      </FlexWrapper>
    </div>
  )
}