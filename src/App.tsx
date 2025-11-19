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

function App() {
  return (
    // Это основной блок - майн, на каждую кнопку должен быть свой
    <div className={styles.container}>
      <Header />
      {/* <MenuMain /> */}
      {/* <MenuCategoryMuvies /> */}
      {/* <MenuFilteredMovies /> */}
      {/* <MenuSearch /> */}
      {/* фильмы отмеченные -  с красным сердечком (любимые)  */}
      {/* <MenuFavorites /> */}
      <Footer />
    </div>
  )
}

export default App

