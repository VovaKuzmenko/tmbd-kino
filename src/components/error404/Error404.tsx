import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../constans/path'
import styles from './Error404.module.css'

export const Error404 = () => {
  const navigate = useNavigate()

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Страница не найдена</h1>
        <p className={styles.text}>
          Такой страницы не существует или ссылка устарела.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => navigate(PATHS.MAIN)}
          >
            На главную
          </button>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => navigate(-1)}
          >
            Назад
          </button>
        </div>
      </div>
    </section>
  )
}