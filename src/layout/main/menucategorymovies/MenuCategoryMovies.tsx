import { RubricTabulation } from "./rubrictabulation/RubricTabulation"
import { Rubric } from "../rubric/Rubric"
import { Pagination } from "../../../components/pagination/Pagination"
import type { RubricItem } from "../../../components/types"
import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../store/store"
import { setCurrentCategory } from "../../../store/app-slice"
import { useSearchParams } from "react-router-dom"
import styles from './MenuCategoryMovies.module.css'

type MenuCategoryMuviesProps = {
  rubrics: RubricItem[]
}

export const MenuCategoryMuvies = ({ rubrics }: MenuCategoryMuviesProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentCategory = useSelector((state: RootState) => state.films.FilmCategory)

  const initializedFromUrlRef = useRef(false)

  const rubricCategories = useMemo(
    () => new Set(rubrics.map((r) => r.category)),
    [rubrics]
  )

  // 1) Один раз читаем category из URL при первом входе на страницу
  useEffect(() => {
    if (initializedFromUrlRef.current) return
    initializedFromUrlRef.current = true

    const categoryFromUrl = searchParams.get('category')

    if (categoryFromUrl && rubricCategories.has(categoryFromUrl as RubricItem['category'])) {
      if (categoryFromUrl !== currentCategory) {
        dispatch(setCurrentCategory(categoryFromUrl as RubricItem['category']))
      }
      return
    }

    // Невалидный/пустой query -> нормализуем URL текущей категорией
    setSearchParams({ category: currentCategory }, { replace: true })
  }, [dispatch, currentCategory, rubricCategories, searchParams, setSearchParams])

  // 2) После инициализации: любое переключение категории пишем в URL
  useEffect(() => {
    if (!initializedFromUrlRef.current) return
    if (searchParams.get('category') === currentCategory) return

    setSearchParams({ category: currentCategory }, { replace: true })
  }, [currentCategory, searchParams, setSearchParams])

  const currentRubric =
    rubrics.find((r) => r.category === currentCategory) ?? rubrics[0]

  return (
    <div className={styles.menuCategoryMovies}>
      <RubricTabulation rubrics={rubrics} />

      <div className={styles.rubricBlock}>
        <Rubric
          title={currentRubric.title}
          category={currentRubric.category}
          showMoreButton={false}
          showAllMovies={true}
          columns={5}
        />
      </div>

      <Pagination />
    </div>
  )
}