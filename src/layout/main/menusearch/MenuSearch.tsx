import { FlexWrapper } from "../../../components/FlexWrapper"
import { Search } from "../../../components/search/Search"

export const MenuSearch = () => {
  return (
    // обернуть в правильную обертку с позиционированием и стили текста
    // дальше идет уже JS - поиск и его результаты
    <div>
      <FlexWrapper>
        <div>Search Results</div>
        <Search />
        <div>Enter a movie title to start searching.</div>
      </FlexWrapper>
    </div>
  )
}