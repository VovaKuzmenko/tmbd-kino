import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../../../../store/store'
import { resetFilters, beginUiTask, endUiTask } from '../../../../../store/app-slice'
import buttonStyles from '../../../../../components/button/Button.module.css'
import styles from './ResetFiltersButton.module.css'

export const ResetFiltersButton = () => {
  const dispatch = useDispatch<AppDispatch>()

  const handleReset = () => {
    dispatch(beginUiTask())
    dispatch(resetFilters())
    requestAnimationFrame(() => dispatch(endUiTask()))
  }

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        onClick={handleReset}
        className={`${buttonStyles.button} ${styles.resetButton}`}
      >
        Reset filters
      </button>
    </div>
  )
}