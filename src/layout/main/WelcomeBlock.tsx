import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import styles from './WelcomeBlock.module.css'
import { Search } from '../../components/search/Search'
import instance, { IMG_BASE_URL } from '../../components/instance/instance'
import type { BaseFilmResponse } from '../../components/types'
import { PATHS } from '../../constans/path'

type PopularResponse = {
  results: BaseFilmResponse[]
}

export const WelcomeBlock = () => {
  const [heroImage, setHeroImage] = useState<string>('')
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

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

  const handleSubmit = () => {
    const normalizedQuery = query.trim()
    if (!normalizedQuery) return

    navigate(`${PATHS.SEARCH}?q=${encodeURIComponent(normalizedQuery)}`)
  }

  const handleClear = () => {
    setQuery('')
  }

  return (
    <StyledMain className={styles.StyledMain}>
      <div className={styles.imageLayer} >
        {heroImage && <img src={heroImage} alt="картинка на весь экран" />}
      </div>

      <div className={styles.content}>
        <h2>WELCOME</h2>
        <h1>Browse highlighted titles from TMDB</h1>

        <Search
          value={query}
          onChange={setQuery}
          onSubmit={handleSubmit}
          onClear={handleClear}
        />
      </div>
    </StyledMain>
  )
}

const StyledMain = styled.section`
`