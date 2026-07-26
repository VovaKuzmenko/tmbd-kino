import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../constans/path'
import styles from './Error404.module.css'

export const Error404 = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate(PATHS.MAIN)
  }

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Страница не найдена</h1>
        <p className={styles.text}>
          This page does not exist or the link is out of date.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleGoHome}
          >
            Main
          </button>
        </div>
      </div>
    </section>
  )
}