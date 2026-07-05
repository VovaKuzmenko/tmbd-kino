import { useEffect, useState } from 'react'
import styled from 'styled-components'
import styles from './WelcomeBlock.module.css'
// ./WelcomeBlock.module.css
import { Search } from "../../components/search/Search"
import instance, { IMG_BASE_URL } from "../../components/instance/instance"
import type { BaseFilmResponse } from "../../components/types"
// import photo from "..."

type PopularResponse = {
  results: BaseFilmResponse[]
}

export const WelcomeBlock = () => {
  const [heroImage, setHeroImage] = useState<string>('')

  useEffect(() => {
    const loadRandomPopularHero = async () => {
      try {
        // TMDB popular: до 500 страниц, берем случайную страницу
        const randomPage = Math.floor(Math.random() * 500) + 1

        const response = await instance.get<PopularResponse>('/popular', {
          params: { page: randomPage }
        })

        const movies = response.data.results ?? []
        if (!movies.length) return

        const randomMovie = movies[Math.floor(Math.random() * movies.length)]

        // Предпочтительно backdrop, если нет - poster
        const imagePath = randomMovie.backdrop_path || randomMovie.poster_path
        if (!imagePath) return

        setHeroImage(`${IMG_BASE_URL}/original${imagePath}`)
      } catch (e) {
        console.error('Failed to load random popular image', e)
      }
    }

    loadRandomPopularHero()
  }, [])

  return (

    <StyledMain className={styles.StyledMain}>
      <div className={styles.imageLayer} >
        {heroImage && <img src={heroImage} alt="картинка на весь экран" />}
      </div>
      <div className={styles.content}>
        <h2>WELCOME</h2>
        <h1>Browse highlighted titles from TMDB</h1>
        <Search />
      </div>
    </StyledMain>
  )
}

const StyledMain = styled.section`
`