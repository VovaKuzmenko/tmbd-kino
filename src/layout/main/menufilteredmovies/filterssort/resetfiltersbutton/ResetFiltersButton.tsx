import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../../../../store/store'
import { resetFilters, beginUiTask, endUiTask } from '../../../../../store/app-slice'

export const ResetFiltersButton = () => {
  const dispatch = useDispatch<AppDispatch>()

  const handleReset = () => {
    dispatch(beginUiTask())
    dispatch(resetFilters())
    requestAnimationFrame(() => dispatch(endUiTask()))
  }

  return (
    <div>
      <button
        className="button variantSecondary"
        type="button"
        onClick={handleReset}
      >
        Reset filters
      </button>
    </div>
  )
}