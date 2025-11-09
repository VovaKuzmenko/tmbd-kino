// import { useState } from 'react'
// import './App.css'
import styles from './App.module.css'
import { Header } from './layout/header/Header'
import { MenuMain } from './layout/main/menumain/MenuMain'
import { MenuCategoryMuvies } from './layout/main/menucategorymovies/MenuCategoryMovies'

function App() {
  return (
    // Это основной блок - майн, на каждую кнопку должен быть свой
    <div className={styles.container}>
      <Header />
      <MenuMain />
      <MenuCategoryMuvies />

      {/* 
      
      <MenuFavorites>
        {/* фильмы отмеченные -  с красным сердечком (любимые) */}
      {/* </MenuFavorites>
      <Footer /> */}
    </div>
  )
}

export default App

