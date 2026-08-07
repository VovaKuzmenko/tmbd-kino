// import type { ChangeEvent } from 'react'
import { useEffect, useState, type ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../../../store/store'
import { beginUiTask, endUiTask, setMinRating } from '../../../../../store/app-slice'
import styles from './RatingFiler.module.css'

const DEBOUNCE_DELAY_MS = 300

export const RatingFilter = () => {
  const dispatch = useDispatch<AppDispatch>()
  const minRating = useSelector((state: RootState) => state.films.minRating)
  const [draftRating, setDraftRating] = useState(minRating)

  useEffect(() => {
    setDraftRating(minRating)
  }, [minRating])

  useEffect(() => {
    if (draftRating === minRating) return

    let completed = false
    dispatch(beginUiTask())

    const timeoutId = window.setTimeout(() => {
      completed = true
      dispatch(setMinRating(draftRating))
      dispatch(endUiTask())
    }, DEBOUNCE_DELAY_MS)

    return () => {
      window.clearTimeout(timeoutId)
      if (!completed) {
        dispatch(endUiTask())
      }
    }
  }, [dispatch, draftRating, minRating])



  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDraftRating(Number(event.target.value))
  }

  return (
    <section className={styles.block}>
      <div className={styles.row}>
        <span className={styles.label}>Rating</span>

        <span className={styles.value}>{draftRating.toFixed(1)} - 10</span>
      </div>

      <input
        className={styles.slider}
        type="range"
        min={0}
        max={10}
        step={0.1}
        value={draftRating}
        onChange={handleChange}
      />
    </section>
  )
}