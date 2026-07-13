import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import styles from './WelcomeBlock.module.css'
import { Search } from '../../components/search/Search'
import instance, { IMG_BASE_URL } from '../../components/instance/instance'
import { PATHS } from '../../constans/path'
import { normalizeRequestError, type RequestError } from '../../Error/error'
import { filmListResponseSchema } from '../../api/schemas'
import { parseApiResponse } from '../../api/validateResponse'



export const WelcomeBlock = () => {
  const [heroImage, setHeroImage] = useState('')
  const [heroError, setHeroError] = useState<RequestError | null>(null)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    let isActive = true

    const loadRandomPopularHero = async () => {
      setHeroError(null)

      try {
        const randomPage = Math.floor(Math.random() * 500) + 1

        const response = await instance.get('/popular', {
          params: { page: randomPage },
        })
        const parsed = parseApiResponse(filmListResponseSchema, response.data)

        if (!isActive) return

        const movies = parsed.results ?? []
        if (!movies.length) {
          setHeroError({
            code: 'empty_results',
            message: 'Не удалось подобрать фильм для фонового изображения',
          })
          return
        }

        const randomMovie = movies[Math.floor(Math.random() * movies.length)]
        const imagePath = randomMovie.backdrop_path || randomMovie.poster_path

        if (!imagePath) {
          setHeroError({
            code: 'missing_image',
            message: 'У выбранного фильма нет фонового изображения',
          })
          return
        }

        setHeroImage(`${IMG_BASE_URL}/original${imagePath}`)
      } catch (error: unknown) {
        if (!isActive) return

        setHeroImage('')
        setHeroError(
          normalizeRequestError(error, 'Не удалось загрузить фоновое изображение')
        )
      }
    }

    void loadRandomPopularHero()

    return () => {
      isActive = false
    }
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
      <div className={styles.imageLayer}>
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

        {heroError && <p>{heroError.message}</p>}
      </div>
    </StyledMain>
  )
}

const StyledMain = styled.section`
`