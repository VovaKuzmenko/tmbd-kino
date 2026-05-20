
import axios from 'axios'

//! тут исправить для формирования фильмов, актеров, и т.д. https://api.themoviedb.org/3
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: import.meta.env.VITE_API_KEY,
    language: 'ru-RU',
    page: 1
  }
})

// Для получения картинок постера и актеров
export const IMG_BASE_URL = 'https://image.tmdb.org/t/p'


export default instance 