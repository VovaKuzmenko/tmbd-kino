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
import { Navigate, Route, Routes } from 'react-router-dom'
import { Error404 } from './components/error404/Error404'
import { PATHS } from './constans/path'
import { FilmInfo } from './layout/main/rubric/rubricfilms/FilmInfo'
import type { FilmCategory } from "../src/components/types"
// Для визуального переключения темы
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from './store/store'
// import { toggleTheme } from './store/app-slice'


const rubrics: Array<{ title: string; category: FilmCategory }> = [
  { title: 'Popular Movies', category: 'popular' },
  { title: 'Top Rated Movies', category: 'top_rated' },
  { title: 'Upcoming Movies', category: 'upcoming' },
  { title: 'Now Playing Movies', category: 'now_playing' },
]

function App() {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.films.theme)

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])
  return (

    // Это основной блок - майн, на каждую кнопку должен быть свой
    <div className={styles.container}>
      <Header />
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
        <Route path={PATHS.FILM_INFO} element={<FilmInfo />} />
        <Route path='*' element={<Navigate to={PATHS.ERROR404} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

