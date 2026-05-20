
// Общие пути для роутинга
export const PATHS = {
  MAIN: '/',
  CATEGORY: '/category',
  FILTERED: '/filtered',
  SEARCH: '/search',
  FAVORITES: '/favorites',
  ERROR404: '/404',
  FILM_INFO: '/film_info'
} as const


// Массив для меню навигации (НАШИ КНОПОЧКИ В ВИДЕ ОБЪЕКТОВ)
export const menuItems = [
  { id: 1, path: PATHS.MAIN, label: 'Main' },
  { id: 2, path: PATHS.CATEGORY, label: 'Category movies' },
  { id: 3, path: PATHS.FILTERED, label: 'Filtered movies' },
  { id: 4, path: PATHS.SEARCH, label: 'Search' },
  { id: 5, path: PATHS.FAVORITES, label: 'Favorites' }
]

