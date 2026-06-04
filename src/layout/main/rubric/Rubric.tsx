

import axios from "axios"
import instance from "./../../../components/instance/instance"
// import { createRoot } from "react-dom/client"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilms } from './../../../store/app-slice'
import type { AppDispatch, RootState } from "./../../../store/store"

import styled from 'styled-components'
import styles from './rubric.module.css'
import { FlexWrapper } from '../../../components/FlexWrapper'
import { MuviesHeaderRubric } from '../rubric/rubricheadermovies/RubricHeaderMovies'
import { RubricFilms } from '../../../components/rubricfilms/RubricFilms'
import type { BaseFilmResponse, Error } from './../../../components/types'

// import { Film } from './../../../components/film/Film'


// тут название рубрики, и кнопка
// 6 картинок - внизу рецтинг (виден постоянно),  в верху при наведении появляется сердечко в кружочке, которое можно отметить как любимый фильм (подсветка кружочка при наведении и изменение цвета кружочка при клике)


// todo  начальный блок - как должно быть без картинок, чисто рыба
{/* Карточка фильма должна содержать:

    Постер фильма
    Название фильма
    Рейтинг (с визуальным индикатором, например, цветной badge)
    Кнопку "❤️ Любимые" для добавления в избранное
    При нажатии на фильм пользователя должно перекинуть на отдельную страницу с фильмом, где он увидит расширенную информацию о фильме смотри 
     */}





export const Rubric = () => {
  const dispatch = useDispatch<AppDispatch>()

  const movies = useSelector((state: RootState) => state.films.filteredFilms)
  const status = useSelector((state: RootState) => state.films.status)
  const error = useSelector((state: RootState) => state.films.error)


  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated', {
  //         params: {
  //           api_key: import.meta.env.VITE_API_KEY,
  //           language: 'ru-RU',
  //           page: 1
  //         }
  //       })
  //       setMovies(response.data.results)
  //       console.log(response.data)
  //     } catch (error) {
  //       console.error('Детали ошибки:', error)
  //       setError(error)
  //     } finally {
  //     }
  //   }
  //   fetchMovies()

  // }, [])
  useEffect(() => {
    dispatch(fetchFilms())
  }, [dispatch])

  { status === 'loading' && <div>loading...</div> }
  { error && <div>Ошибка: {error}</div> }
  { status === 'succeeded' && movies.length === 0 && <div>No movies</div> }

  return (
    <FlexWrapper>
      <StyledRubric className={styles['StyledRubric']}>
        <MuviesHeaderRubric />
        <RubricFilms />
      </StyledRubric >

      <div style={{ width: "45%" }}>
        <h2>🎦 Films</h2>
        <div>
          {movies === null && (<div>loading</div>)}
          {movies?.length === 0 && (<div>No movies</div>)}

          {movies?.map((m) => {
            return (
              <div key={m.id}>
                <b>{m.title}</b>
                ,<p>{m.overview}</p>
                <p>⭐ {m.popularity} </p>
                {/* <img src={m.backdrop_path} alt="No poster" /> */}

              </div>
            )
          })}
        </div>
      </div>
    </FlexWrapper>
  )
}

const StyledRubric = styled.section``