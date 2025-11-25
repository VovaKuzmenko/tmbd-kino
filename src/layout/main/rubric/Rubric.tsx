// import axios from "axios"
// import { createRoot } from "react-dom/client"
// import { useEffect, useState } from "react"

// import styled from 'styled-components'
// import styles from './rubric.module.css'
// import { FlexWrapper } from '../../../components/FlexWrapper'
// import { MuviesHeaderRubric } from '../rubric/rubricheadermovies/RubricHeaderMovies'
// import { RubricFilms } from '../../../components/rubricfilms/RubricFilms'


// // тут название рубрики, и кнопка
// // 6 картинок - внизу рецтинг (виден постоянно),  в верху при наведении появляется сердечко в кружочке, которое можно отметить как любимый фильм (подсветка кружочка при наведении и изменение цвета кружочка при клике)





// export const Rubric = () => {

//   const [movies, setMovies] = useState([])
//   const [error, setError] = useState(null)


//   useEffect(() => {
//     // const fetchMovies = async () => {
//     //   try {
//     //     const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated', {
//     //       params: {
//     //         api_key: YOUR_API_KEY,
//     //       }
//     //     })
//     //     setMovies(response.data)
//     //     console.log(movies)
//     //   } catch (err) {
//     //     setError(err.message)
//     //   }
//     // }
//     // fetchMovies()

//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
//           params: {
//             api_key: YOUR_API_KEY,
//             language: 'ru-RU',
//             page: 1
//           }
//         })
//         setMovies(response.data.results)
//       } catch (err) {
//         console.error('Детали ошибки:', err.response?.data)
//         setError(err.message)
//       } finally {
//       }
//     }
//   }, [])

//   if (error) return <div>Ошибка: {error}</div>

//   return (
//     <FlexWrapper>
//       {/* <StyledRubric className={styles['StyledRubric']}>
//         <MuviesHeaderRubric />
//         <RubricFilms />
//       </StyledRubric > */}

//       <div style={{ width: "45%" }}>
//         <h2>🎦 Films</h2>
//         <div>
//           {movies.map((m) => {
//             return (
//               <div key={m}>
//                 <p>{m}</p>
//                 {/* <b>{m.nameOriginal}</b>
//               <p>{m.description}</p>
//               <p>⭐ {m.ratingImdb} </p> */}
//               </div>
//             )
//           })}
//         </div>
//       </div>

//     </FlexWrapper>
//   )
// }

// const StyledRubric = styled.section`

// `

import { useState, useEffect } from 'react'
import axios from 'axios'

interface Movie {
  id: number
  title: string
  poster_path: string
  release_date: string
  vote_average: number
}

export const Rubric = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)



  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming', {
          params: {
            api_key: YOUR_API_KEY,
            language: 'ru-RU',
            page: 1
          }
        })
        console.log(response.data.results)
        setMovies(response.data.results)
        // setMovies(response.data.results)

      } catch (err) {
        console.error('Детали ошибки:', err)
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
      } finally {
        setLoading(false)
      }

    }

    fetchMovies()
  }, [])

  if (loading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка: {error}</div>

  return (
    <div style={{ padding: '20px' }}>
      <h2>🎬 Популярные фильмы</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px',
            textAlign: 'center'
          }}>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '100%', borderRadius: '4px' }}
            />
            <h3 style={{ fontSize: '16px', margin: '10px 0 5px' }}>
              {movie.title}
            </h3>
            <p style={{ fontSize: '14px', color: '#666' }}>
              {movie.release_date}
            </p>
            <p style={{ fontSize: '14px' }}>
              ⭐ {movie.vote_average.toFixed(1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}