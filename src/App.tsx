// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.logoRow}>
        <img src={viteLogo} alt="Vite logo" width={40} />
        <img src={reactLogo} alt="React logo" width={40} />
      </div>
      <h1 className={styles.title}>TMDB Kino</h1>
    </div>
  )
}

export default App

