import type { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../../../store/store'
import { beginUiTask, endUiTask, setMinRating } from '../../../../../store/app-slice'
import styles from './RatingFiler.module.css'

export const RatingFilter = () => {
  const dispatch = useDispatch<AppDispatch>()
  const minRating = useSelector((state: RootState) => state.films.minRating)

  const applyRating = (value: number) => {
    dispatch(beginUiTask())
    dispatch(setMinRating(value))
    requestAnimationFrame(() => dispatch(endUiTask()))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    applyRating(Number(event.target.value))
  }

  return (
    <section className={styles.block}>
      <div className={styles.row}>
        <span className={styles.label}>Rating</span>
        <span className={styles.value}>{minRating.toFixed(1)} - 10</span>
      </div>

      <input
        className={styles.slider}
        type="range"
        min={0}
        max={10}
        step={0.1}
        value={minRating}
        onChange={handleChange}
      />
    </section>
  )
}