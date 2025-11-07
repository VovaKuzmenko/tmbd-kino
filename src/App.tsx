// import { useState } from 'react'
// import './App.css'
import styles from './App.module.css'
import { Header } from './layout/header/Header'
import { Main } from './layout/main/Main'


function App() {
  return (
    // Это основной блок - майн, на каждую кнопку должен быть свой
    <div className={styles.container}>
      <Header />
      <Main />
      <Rubric />
      <Footer />
    </div>
  )
}

export default App

