import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import styles from './WelcomeBlock.module.css'
import { Search } from '../../components/search/Search'
import instance, { IMG_BASE_URL } from '../../components/instance/instance'
import { PATHS } from '../../constans/path'
import { pushRequestErrorToast, pushToast } from '../../shared/notifications'
import { filmListResponseSchema } from '../../api/schemas'
import { parseApiResponse } from '../../api/validateResponse'

export const WelcomeBlock = () => {
  const [heroImage, setHeroImage] = useState('')
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    let isActive = true

    const loadRandomPopularHero = async () => {
      try {
        const randomPage = Math.floor(Math.random() * 500) + 1

        const response = await instance.get('/popular', {
          params: { page: randomPage },
        })
        const parsed = parseApiResponse(filmListResponseSchema, response.data)

        if (!isActive) return

        const movies = parsed.results ?? []
        if (!movies.length) {
          setHeroImage('')
          pushToast({
            kind: 'error',
            title: 'Background Error',
            message: 'Unable to find a movie for the background image.',
          })
          return
        }

        const randomMovie = movies[Math.floor(Math.random() * movies.length)]
        const imagePath = randomMovie.backdrop_path || randomMovie.poster_path

        if (!imagePath) {
          setHeroImage('')
          pushToast({
            kind: 'error',
            title: 'Background Error',
            message: 'The selected movie does not have a background image.',
          })
          return
        }

        setHeroImage(`${IMG_BASE_URL}/original${imagePath}`)
      } catch (error: unknown) {
        if (!isActive) return

        setHeroImage('')
        pushRequestErrorToast(
          error,
          'Failed to load background image',
          'Background Error'
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
        {heroImage && <img src={heroImage} alt='full screen picture' />}
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

