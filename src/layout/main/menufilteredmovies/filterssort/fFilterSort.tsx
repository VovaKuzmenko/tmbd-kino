import { DropList } from './droplist/Droplist'
import { FiltersButton } from './filtersbutton/FiltersButton'
import { RatingFilter } from './ratingfilter/RatingFilter'
import { ResetFiltersButton } from './resetfiltersbutton/ResetFiltersButton'

export const FiltersSort = () => {
  return (
    <div>
      <h3>Filters / Sort</h3>
      <DropList />
      <RatingFilter />
      <FiltersButton />
      <ResetFiltersButton />
    </div>
  )
}