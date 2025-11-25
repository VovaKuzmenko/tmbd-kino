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
import { Navigate, Route, Routes } from 'react-router'
import { Error404 } from './components/error404/Error404'


function App() {
  return (
    // Это основной блок - майн, на каждую кнопку должен быть свой
    <div className={styles.container}>
      <Header />
      <Routes>
        <Route path='/' element={<MenuMain />} />
        <Route path='/main' element={<MenuMain />} />
        <Route path='/category' element={<MenuCategoryMuvies />} />
        <Route path='/filtered' element={<MenuFilteredMovies />} />
        <Route path='/search' element={<MenuSearch />} />
        {/* фильмы отмеченные -  с красным сердечком (любимые)  */}
        <Route path='/favorites' element={<MenuFavorites />} />
        <Route path='/404' element={<Error404 />} />
        <Route path='*' element={<Navigate to="/404" />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

