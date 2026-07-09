import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../../../../store/store'
import { resetFilters } from '../../../../../store/app-slice'

export const ResetFiltersButton = () => {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div>
      <button
        className="button variantSecondary"
        type="button"
        onClick={() => dispatch(resetFilters())}
      >
        Reset filters
      </button>
    </div>
  )
}