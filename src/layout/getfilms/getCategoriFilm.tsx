
///* Схема AI */


// import { useState, useEffect } from 'react'
// import axios from 'axios'

// interface Movie {
//   id: number
//   title: string
//   poster_path: string
//   release_date: string
//   vote_average: number
// }

// export const Rubric = () => {
//   const [movies, setMovies] = useState<Movie[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   const YOUR_API_KEY = import.meta.env.VITE_API_KEY

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         setLoading(true)
//         const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming', {
//           params: {
//             api_key: YOUR_API_KEY,
//             language: 'ru-RU',
//             page: 1
//           }
//         })
//         // console.log(response.data.results)
//         setMovies(response.data.results)
//         // setMovies(response.data.results)

//       } catch (err) {
//         // console.error('Детали ошибки:', err)
//         setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
//       } finally {
//         setLoading(false)
//       }

//     }

//     fetchMovies()
//   }, [])

//   if (loading) return <div>Загрузка...</div>
//   if (error) return <div>Ошибка: {error}</div>

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>🎬 Популярные фильмы</h2>
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//         gap: '20px'
//       }}>
//         {/* todo надо поставить карточку Film и передать туда значения - настроить соответственно пути */}
//         {/* или как вариант вставить индекс(id) фильма ${'индексм_фильма'} */}
//         {/* обработать некорректный адрес ячейки массива  и несуществующий фильм */}
//         {/* <link key={index} to '/фильмы/название_фильма(номер фильма)/' /> */}
//         // todo  отрисовываем пустой элемент Film
//         {/* <Film /> */}
//         // todo  тут проходимся по массиву и передаем туда параметры для отображения

//         {movies.map((movie) => (
//           <div key={movie.id} style={{
//             border: '1px solid #ddd',
//             borderRadius: '8px',
//             padding: '10px',
//             textAlign: 'center'
//           }}>
//             <img
//               src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
//               alt={movie.title}
//               style={{ width: '100%', borderRadius: '4px' }}
//             />
//             <h3 style={{ fontSize: '16px', margin: '10px 0 5px' }}>
//               {movie.title}
//             </h3 >
//             <p style={{ fontSize: '14px', color: '#666' }}>
//               {movie.release_date}
//             </p>
//             <p style={{ fontSize: '14px' }}>
//               ⭐ {movie.vote_average.toFixed(1)}
//             </p>
//           </div >
//         ))}
//       </div >
//     </div >
//   )
// }




// ** Популярные фильмы *****/


import axios from "axios"
import { createRoot } from "react-dom/client"
import React, { useEffect } from "react"

import styled from 'styled-components'
import styles from './rubric.module.css'
import { FlexWrapper } from '../../../components/FlexWrapper'
import { MuviesHeaderRubric } from '../rubric/rubricheadermovies/RubricHeaderMovies'
import { RubricFilms } from '../../../components/rubricfilms/RubricFilms'

import { Film } from './../../../components/film/Film'


// // тут название рубрики, и кнопка
// // 6 картинок - внизу рецтинг (виден постоянно),  в верху при наведении появляется сердечко в кружочке, которое можно отметить как любимый фильм (подсветка кружочка при наведении и изменение цвета кружочка при клике)


// todo  начальный блок - как должно быть без картинок, чисто рыба
{/* Карточка фильма должна содержать:

    Постер фильма
    Название фильма
    Рейтинг (с визуальным индикатором, например, цветной badge)
    Кнопку "❤️ Любимые" для добавления в избранное
    При нажатии на фильм пользователя должно перекинуть на отдельную страницу с фильмом, где он увидит расширенную информацию о фильме смотри 
     */}


//  что делать с total_results и с page
type Film = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const Rubric = () => {

  const [movies, setMovies] = React.useState<Film[] | null>(null)
  const [error, setError] = React.useState(null)


  useEffect(() => {
    // const fetchMovies = async () => {
    //   try {
    //     const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated', {
    //       params: {
    //         api_key: YOUR_API_KEY,
    //       }
    //     })
    //     setMovies(response.data)
    //     console.log(movies)
    //   } catch (err) {
    //     setError(err.message)
    //   }
    // }
    // fetchMovies()

    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            language: 'ru-RU',
            page: 1
          }
        })
        setMovies(response.data.results)
        console.log(response.data.results)
      } catch (err) {
        console.error('Детали ошибки:', err.response?.data)
        setError(err.message)
      } finally {
      }
    }
    fetchMovies()
  }, [])

  if (error) return <div>Ошибка: {error}</div>

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
                <img src={'https://image.tmdb.org/t/p/original' + m.backdrop_path} alt={m.title} />

              </div>
            )
          })}
        </div>
      </div>
    </FlexWrapper>
  )
}

const StyledRubric = styled.section`
`

// ** Топовые фильмы *****/

import axios from "axios"
// import { createRoot } from "react-dom/client"
import React, { useEffect } from "react"

import styled from 'styled-components'
import styles from './rubric.module.css'
import { FlexWrapper } from '../../../components/FlexWrapper'
import { MuviesHeaderRubric } from '../rubric/rubricheadermovies/RubricHeaderMovies'
import { RubricFilms } from '../../../components/rubricfilms/RubricFilms'

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

type Film = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

type Error = {
  code: string;
  message: string;
  name: boolean;
}

export const Rubric = () => {

  const [movies, setMovies] = React.useState<Film[] | null>(null)
  const [error, setError] = React.useState<Error | null>(null)


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated', {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            language: 'ru-RU',
            page: 1
          }
        })
        setMovies(response.data.results)
        console.log(response.data)
      } catch (error) {
        console.error('Детали ошибки:', error)
        setError(error)
      } finally {
      }
    }
    fetchMovies()
  }, [])

  if (error) return (<div>
    <div>Ошибка: {error.code}</div>
    <div>Ошибка: {error.message}</div>
    <div>Ошибка: {error.name}</div>
  </div>)


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