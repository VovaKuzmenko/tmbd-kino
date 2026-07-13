import { buildCreateSlice, asyncThunkCreator, type PayloadAction } from '@reduxjs/toolkit'
import type { BaseFilmResponse, FilmCategory } from '../components/types/types.ts'
import instance from './../components/instance/instance'
import { normalizeRequestError, type RequestError } from '../Error/error'

export type ThemeMode = 'light' | 'dark'

type SortType =
  | 'default'
  | 'popularityIncrease'
  | 'popularityDecrease'
  | 'ratingIncrease'
  | 'ratingDecrease'
  | 'releaseDateIncrease'
  | 'releaseDateDecrease'
  | 'titleIncrease'
  | 'titleDecrease'

type FilmsState = {
  films: BaseFilmResponse[]
  filteredFilms: BaseFilmResponse[]
  favorites: BaseFilmResponse[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: RequestError | null
  FilmCategory: FilmCategory
  sortType: SortType
  selectedGenres: number[]
  theme: ThemeMode
}

const createFilmSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const FAVORITES_KEY = 'tmdb_favorites'
const THEME_KEY = 'tmdb_theme'

const loadFavorites = (): BaseFilmResponse[] => {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const saveFavorites = (favorites: BaseFilmResponse[]) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  } catch {
  }
}

const loadTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light'
  try {
    const raw = localStorage.getItem(THEME_KEY)
    return raw === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

const saveTheme = (theme: ThemeMode) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
  }
}

const sortMovies = (movies: BaseFilmResponse[], sortType: SortType): BaseFilmResponse[] => {
  const arr = [...movies]

  switch (sortType) {
    case 'popularityIncrease':
      return arr.sort((a, b) => a.popularity - b.popularity)
    case 'popularityDecrease':
      return arr.sort((a, b) => b.popularity - a.popularity)
    case 'ratingIncrease':
      return arr.sort((a, b) => a.vote_average - b.vote_average)
    case 'ratingDecrease':
      return arr.sort((a, b) => b.vote_average - a.vote_average)
    case 'releaseDateIncrease':
      return arr.sort(
        (a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      )
    case 'releaseDateDecrease':
      return arr.sort(
        (a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      )
    case 'titleIncrease':
      return arr.sort((a, b) => (a.original_title > b.original_title ? 1 : -1))
    case 'titleDecrease':
      return arr.sort((a, b) => (a.original_title < b.original_title ? 1 : -1))
    default:
      return arr
  }
}

const applyFiltersAndSort = (state: FilmsState) => {
  const filteredByGenres =
    state.selectedGenres.length === 0
      ? state.films
      : state.films.filter((movie) =>
        state.selectedGenres.every((genreId) => movie.genre_ids.includes(genreId))
      )

  state.filteredFilms = sortMovies(filteredByGenres, state.sortType)
}

const initialState: FilmsState = {
  films: [],
  filteredFilms: [],
  favorites: loadFavorites(),
  status: 'idle',
  error: null,
  FilmCategory: 'popular',
  sortType: 'default',
  selectedGenres: [],
  theme: loadTheme(),
}

export const filmSlice = createFilmSlice({
  name: 'films',
  initialState,

  reducers: (create) => ({
    fetchFilms: create.asyncThunk<
      { category: FilmCategory; results: BaseFilmResponse[] },
      FilmCategory,
      { rejectValue: RequestError }
    >(
      async (category, { rejectWithValue }) => {
        try {
          const response = await instance.get('/' + category)
          return { category, results: response.data.results }
        } catch (error: unknown) {
          return rejectWithValue(
            normalizeRequestError(error, 'Failed to load films for ' + category)
          )
        }
      },
      {
        pending: (state, action) => {
          const category = action.meta.arg
          state.status = 'loading'
          state.error = null
          state.FilmCategory = category
        },
        fulfilled: (state, action) => {
          const { category, results } = action.payload
          state.status = 'succeeded'
          state.FilmCategory = category
          state.films = results
          applyFiltersAndSort(state)
        },
        rejected: (state, action) => {
          const category = action.meta.arg
          state.status = 'failed'
          state.FilmCategory = category
          state.error = action.payload ?? {
            code: 'unknown_error',
            message: 'Unexpected error',
          }
        },
      }
    ),

    toggleGenreFilter: create.reducer((state, action: PayloadAction<number>) => {
      const genreId = action.payload
      const exists = state.selectedGenres.includes(genreId)

      state.selectedGenres = exists
        ? state.selectedGenres.filter((id) => id !== genreId)
        : [...state.selectedGenres, genreId]

      applyFiltersAndSort(state)
    }),

    resetFilters: create.reducer((state) => {
      state.selectedGenres = []
      state.sortType = 'default'
      state.filteredFilms = [...state.films]
    }),

    sortByPopularityIncrease: create.reducer((state) => {
      state.sortType = 'popularityIncrease'
      applyFiltersAndSort(state)
    }),

    sortByPopularityDecrease: create.reducer((state) => {
      state.sortType = 'popularityDecrease'
      applyFiltersAndSort(state)
    }),

    sortByReleaseDateIncrease: create.reducer((state) => {
      state.sortType = 'releaseDateIncrease'
      applyFiltersAndSort(state)
    }),

    sortByReleaseDateDecrease: create.reducer((state) => {
      state.sortType = 'releaseDateDecrease'
      applyFiltersAndSort(state)
    }),

    sortByRatingIncrease: create.reducer((state) => {
      state.sortType = 'ratingIncrease'
      applyFiltersAndSort(state)
    }),

    sortByRatingDecrease: create.reducer((state) => {
      state.sortType = 'ratingDecrease'
      applyFiltersAndSort(state)
    }),

    sortByTitleIncrease: create.reducer((state) => {
      state.sortType = 'titleIncrease'
      applyFiltersAndSort(state)
    }),

    sortByTitleDecrease: create.reducer((state) => {
      state.sortType = 'titleDecrease'
      applyFiltersAndSort(state)
    }),

    toggleFavorite: create.reducer((state, action: PayloadAction<BaseFilmResponse>) => {
      const movieIndex = state.favorites.findIndex((movie) => movie.id === action.payload.id)
      if (movieIndex === -1) {
        state.favorites.push(action.payload)
      } else {
        state.favorites.splice(movieIndex, 1)
      }
      saveFavorites(state.favorites)
    }),

    removeFavoriteById: create.reducer((state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter((movie) => movie.id !== action.payload)
      saveFavorites(state.favorites)
    }),

    clearFavorites: create.reducer((state) => {
      state.favorites = []
      saveFavorites(state.favorites)
    }),

    setTheme: create.reducer((state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload
      saveTheme(state.theme)
    }),
  }),
})

export const {
  fetchFilms,
  toggleGenreFilter,
  resetFilters,
  sortByPopularityIncrease,
  sortByPopularityDecrease,
  sortByReleaseDateIncrease,
  sortByReleaseDateDecrease,
  sortByRatingIncrease,
  sortByRatingDecrease,
  sortByTitleIncrease,
  sortByTitleDecrease,
  toggleFavorite,
  removeFavoriteById,
  clearFavorites,
  setTheme,
} = filmSlice.actions

export const filmReducerSort = filmSlice.reducer