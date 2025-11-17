import styles from './Search.module.css'
// D: \JS\in -cubator\TMDB - kinopoisk\tmdb - kino\src\components\search\Search.module.css
export const Search = () => {
  return (
    <div>
      <form className={styles['form-main-block']} action="#">
        <input 
          placeholder="Search for a movie" 
          type="text" 
          className={styles['form-main-block__input']} 
        />
        <button 
          type="submit" 
          className={styles['form-main-block__button']}
        >
          Search
        </button>
      </form>
    </div>
  )
}