// import { useState } from 'react'
// import './App.css'
import styles from './App.module.css'
import { Header } from './layout/header/Header'
import { MenuMain } from './layout/main/menumain/MenuMain'
import { MenuCategoryMuvies } from './layout/main/menucategorymovies/MenuCategoryMovies'
import { MenuFilteredMovies } from './layout/main/menufilteredmovies/MenuFilteredMovies'
import { MenuSearch } from './layout/main/menusearch/MenuSearch'
import { MenuFavorites } from './layout/main/menufavorites/MenuFavorites'
import { Footer } from './layout/footer/Footer'
import { Route, Routes } from 'react-router-dom'
import { Error404 } from './components/error404/Error404'
import { PATHS } from './constans/path'
import { FilmInfo } from './layout/main/rubric/rubricfilms/FilmInfo'
import type { FilmCategory } from "../src/components/types"
import { useSelector } from 'react-redux'
// Для визуального переключения темы
import { useEffect } from 'react'
import type { RootState } from './store/store'
import { LinearProgress } from './components/linearprogress/LinearProgress'
import { SkeletonTheme } from 'react-loading-skeleton'
// import { toggleTheme } from './store/app-slice'
import { AppSnackbar } from './components/snackbar/AppSnackbar'


const rubrics: Array<{ title: string; category: FilmCategory }> = [
  { title: 'Popular Movies', category: 'popular' },
  { title: 'Top Rated Movies', category: 'top_rated' },
  { title: 'Upcoming Movies', category: 'upcoming' },
  { title: 'Now Playing Movies', category: 'now_playing' },
]

function App() {
  const theme = useSelector((state: RootState) => state.films.theme)

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  const baseColor = theme === 'dark' ? '#1f2937' : '#e5e7eb'
  const highlightColor = theme === 'dark' ? '#334155' : '#f3f4f6'


  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      {/* Это основной блок - майн, на каждую кнопку должен быть свой */}
      <div className={styles.container}>
        <LinearProgress />
<AppSnackbar />
        <Header />
        {/* main-оберткуа для прилипания  Header и Footer*/}
        <main className={styles.main}>
          <Routes>
            <Route path={PATHS.MAIN} element={<MenuMain
              rubrics={rubrics}
            />} />
            <Route path={PATHS.CATEGORY} element={<MenuCategoryMuvies rubrics={rubrics} />} />
            <Route path={PATHS.FILTERED} element={<MenuFilteredMovies />} />
            <Route path={PATHS.SEARCH} element={<MenuSearch />} />
            {/* фильмы отмеченные -  с красным сердечком (любимые)  */}
            <Route path={PATHS.FAVORITES} element={<MenuFavorites />} />
            <Route path={PATHS.ERROR404} element={<Error404 />} />
            {/* <Route path={PATHS.FILM_INFO} element={<FilmInfo />} /> */}
            <Route path="/film_info/:id" element={<FilmInfo />} />
            <Route path="*" element={<Error404 />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </SkeletonTheme>
  )
}

export default App

