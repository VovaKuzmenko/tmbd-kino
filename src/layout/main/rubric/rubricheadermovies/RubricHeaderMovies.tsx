import styles from './RubricHeaderMovies.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../../../store/store'
import { fetchFilms, setCurrentCategory } from '../../../../store/app-slice'
import { PATHS } from '../../../../constans/path'
import type { FilmCategory } from '../../../../components/types'

type MuviesHeaderRubricProps = {
  title: string
  category?: FilmCategory
  showMoreButton?: boolean
}

export const MuviesHeaderRubric = ({
  title,
  category,
  showMoreButton = false,
}: MuviesHeaderRubricProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const HanddlerOpenCategoryPage = () => {
    if (!category) return

    dispatch(setCurrentCategory(category))
    dispatch(fetchFilms(category))
    navigate(`${PATHS.CATEGORY}?category=${category}`)
  }

  return (
    <div className={styles["MuviesHeaderRubric"]}>
      <h3>{title}</h3>

      {showMoreButton && category && (
        <button
          className={styles["MuviesHeaderRubric__button"]}
          onClick={HanddlerOpenCategoryPage}
        >
          View more
        </button>
      )}
    </div>
  )
}