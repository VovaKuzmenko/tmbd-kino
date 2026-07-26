import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import styles from './LinearProgress.module.css'

export const LinearProgress = () => {
  const isVisible = useSelector((state: RootState) => {
    const filmsState = state.films

    return (
      filmsState.networkRequestsInFlight > 0 ||
      filmsState.uiTasksInFlight > 0
    )
  })

  return (
    <div
      className={`${styles.root} ${isVisible ? styles.visible : ''}`}
      aria-hidden={!isVisible}
    >
      <div className={styles.bar} />
    </div>
  )
}