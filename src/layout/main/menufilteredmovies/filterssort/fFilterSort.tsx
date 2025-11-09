import { DropList } from "./droplist/Droplist"
import { FiltersButton } from "./filtersbutton/FiltersButton"
import { Reiting } from '../../../../components/reiting/Reiting'
import { ResetFiltersButton } from "./resetfiltersbutton/ResetFiltersButton"



export const FiltersSort = () => {
  return (
    <div>
      {/* Выпадающий список */}
      <DropList />
      {/* полоска рейтинга */}
      <Reiting />
      {/* фильтрующие кнопки */}
      <FiltersButton />
      {/* кнопка сброса */}
      <ResetFiltersButton />
    </div>
  )
}