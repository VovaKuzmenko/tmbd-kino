import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilms } from './../../../store/app-slice'
import type { AppDispatch, RootState } from "./../../../store/store"

import styled from 'styled-components'
import styles from './rubric.module.css'
import { FlexWrapper } from '../../../components/FlexWrapper'
import { MuviesHeaderRubric } from '../rubric/rubricheadermovies/RubricHeaderMovies'
import { RubricFilms } from '../../../components/rubricfilms/RubricFilms'
import { RubricFilmsSkeleton } from '../../../components/rubricfilms/RubricFilmsSkeleton'
import type { FilmCategory } from './../../../components/types'
import { Pagination } from '../../../components/pagination/Pagination'

type RubricProps = {
  title: string
  category?: FilmCategory
  showMoreButton?: boolean
  showAllMovies?: boolean
  moviesLimit?: number
  columns?: number
  enablePagination?: boolean
  itemsPerPage?: number
}

export const Rubric = ({
  title,
  category,
  showMoreButton = false,
  showAllMovies = false,
  moviesLimit = 6,
  columns = 5,
  enablePagination = false,
  itemsPerPage = 20,
}: RubricProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const [filteredPage, setFilteredPage] = useState(1)

  const currentCategory = useSelector((state: RootState) => state.films.FilmCategory)
  const activeCategory = category ?? currentCategory

  const categoryState = useSelector(
    (state: RootState) => state.films.filmsByCategory[activeCategory]
  )
  const filteredMovies = useSelector((state: RootState) => state.films.filteredFilms)

  const movies = category ? categoryState.items : filteredMovies
  const status = categoryState.status
  const error = categoryState.error

  const isCategoryServerPagination = Boolean(category && showAllMovies && enablePagination)
  const isFilteredClientPagination = Boolean(!category && showAllMovies && enablePagination)

  const filteredTotalPages = useMemo(() => {
    if (!isFilteredClientPagination) return 1
    return Math.max(1, Math.ceil(filteredMovies.length / itemsPerPage))
  }, [filteredMovies.length, isFilteredClientPagination, itemsPerPage])

  const visibleMovies = useMemo(() => {
    if (!showAllMovies) {
      return movies.slice(0, moviesLimit)
    }

    if (isCategoryServerPagination) {
      return movies
    }

    if (isFilteredClientPagination) {
      const startIndex = (filteredPage - 1) * itemsPerPage
      return filteredMovies.slice(startIndex, startIndex + itemsPerPage)
    }

    return movies
  }, [
    showAllMovies,
    movies,
    moviesLimit,
    isCategoryServerPagination,
    isFilteredClientPagination,
    filteredPage,
    itemsPerPage,
    filteredMovies,
  ])

  useEffect(() => {
    if (categoryState.status !== 'idle') return
    if (categoryState.items.length > 0) return

    dispatch(fetchFilms({ category: activeCategory, page: 1 }))
  }, [dispatch, activeCategory, categoryState.status, categoryState.items.length])

  useEffect(() => {
    setFilteredPage(1)
  }, [activeCategory, filteredMovies.length, isFilteredClientPagination])

  useEffect(() => {
    if (filteredPage <= filteredTotalPages) return
    setFilteredPage(filteredTotalPages)
  }, [filteredPage, filteredTotalPages])

  const isLoading = status === 'loading'

  const currentPage = isCategoryServerPagination ? categoryState.page : filteredPage
  const totalPages = isCategoryServerPagination ? categoryState.totalPages : filteredTotalPages

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === currentPage) return

    if (isCategoryServerPagination) {
      dispatch(fetchFilms({ category: activeCategory, page: nextPage }))
      return
    }

    setFilteredPage(nextPage)
  }

  return (
    <FlexWrapper>
      <StyledRubric className={styles['StyledRubric']}>
        <MuviesHeaderRubric
          title={title}
          category={activeCategory}
          showMoreButton={showMoreButton}
        />

        {isLoading && <RubricFilmsSkeleton count={showAllMovies ? itemsPerPage : moviesLimit} />}

        {!isLoading && error && (
          <div>
            <div>Ошибка: {error.message}</div>
            {error.status && <div>HTTP status: {error.status}</div>}
          </div>
        )}

        {!isLoading && !error && movies.length === 0 && <div>No movies</div>}

        {!isLoading && movies.length > 0 && (
          <>
            <RubricFilms movies={visibleMovies} columns={columns} />

            {enablePagination && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </StyledRubric>
    </FlexWrapper>
  )
}

const StyledRubric = styled.section``