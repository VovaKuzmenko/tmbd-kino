import { buildCreateSlice, asyncThunkCreator, type PayloadAction } from '@reduxjs/toolkit'
import type { BaseFilmResponse, FilmCategory } from '../components/types/types.ts'
import instance from './../components/instance/instance'
import { normalizeRequestError, type RequestError } from '../Error/error'
import { filmListResponseSchema } from '../api/schemas'
import { parseApiResponse } from '../api/validateResponse'

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

type CategoryState = {
  items: BaseFilmResponse[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: RequestError | null
  page: number
  totalPages: number
}

type FilmsState = {
  filmsByCategory: Record<FilmCategory, CategoryState>
  filteredFilms: BaseFilmResponse[]
  favorites: BaseFilmResponse[]
  FilmCategory: FilmCategory
  sortType: SortType
  selectedGenres: number[]
  minRating: number
  theme: ThemeMode
  networkRequestsInFlight: number
  uiTasksInFlight: number
}

const createFilmSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const FAVORITES_KEY = 'tmdb_favorites'
const THEME_KEY = 'tmdb_theme'

const createCategoryState = (): CategoryState => ({
  items: [],
  status: 'idle',
  error: null,
  page: 1,
  totalPages: 1,
})

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
  const sourceMovies = state.filmsByCategory[state.FilmCategory].items

  const filteredByGenres =
    state.selectedGenres.length === 0
      ? sourceMovies
      : sourceMovies.filter((movie) =>
        state.selectedGenres.every((genreId) => movie.genre_ids.includes(genreId))
      )

  const filteredByRating = filteredByGenres.filter(
    (movie) => movie.vote_average >= state.minRating
  )

  state.filteredFilms = sortMovies(filteredByRating, state.sortType)
}

const initialState: FilmsState = {
  filmsByCategory: {
    popular: createCategoryState(),
    top_rated: createCategoryState(),
    upcoming: createCategoryState(),
    now_playing: createCategoryState(),
  },
  filteredFilms: [],
  favorites: loadFavorites(),
  FilmCategory: 'popular',
  sortType: 'default',
  selectedGenres: [],
  minRating: 0,
  theme: loadTheme(),
  networkRequestsInFlight: 0,
  uiTasksInFlight: 0,
}

export const filmSlice = createFilmSlice({
  name: 'films',
  initialState,

  reducers: (create) => ({
    fetchFilms: create.asyncThunk<
      { category: FilmCategory; results: BaseFilmResponse[]; page: number; totalPages: number },
      { category: FilmCategory; page: number },
      { rejectValue: RequestError }
    >(
      async ({ category, page }, { rejectWithValue }) => {
        try {
          const response = await instance.get('/' + category, { params: { page } })
          const parsed = parseApiResponse(filmListResponseSchema, response.data)

          const pageFromApi = parsed.page
          const totalPagesFromApi = parsed.total_pages

          return {
            category,
            results: parsed.results,
            page: pageFromApi,
            totalPages: Math.max(1, totalPagesFromApi),
          }
        } catch (error: unknown) {
          return rejectWithValue(
            normalizeRequestError(error, 'Failed to load films for ' + category)
          )
        }
      },
      {
        pending: (state, action) => {
          const { category } = action.meta.arg
          state.filmsByCategory[category].status = 'loading'
          state.filmsByCategory[category].error = null
          state.networkRequestsInFlight += 1
        },
        fulfilled: (state, action) => {
          const { category, results, page, totalPages } = action.payload
          state.filmsByCategory[category].status = 'succeeded'
          state.filmsByCategory[category].items = results
          state.filmsByCategory[category].page = page
          state.filmsByCategory[category].totalPages = totalPages
          state.filmsByCategory[category].error = null

          if (category === state.FilmCategory) {
            applyFiltersAndSort(state)
          }

          state.networkRequestsInFlight = Math.max(0, state.networkRequestsInFlight - 1)
        },
        rejected: (state, action) => {
          const { category } = action.meta.arg
          state.filmsByCategory[category].status = 'failed'
          state.filmsByCategory[category].error = action.payload ?? {
            code: 'unknown_error',
            message: 'Unexpected error',
          }
          state.networkRequestsInFlight = Math.max(0, state.networkRequestsInFlight - 1)
        },
      }
    ),

    setCurrentCategory: create.reducer((state, action: PayloadAction<FilmCategory>) => {
      state.FilmCategory = action.payload
      applyFiltersAndSort(state)
    }),

    toggleGenreFilter: create.reducer((state, action: PayloadAction<number>) => {
      const genreId = action.payload
      const exists = state.selectedGenres.includes(genreId)

      state.selectedGenres = exists
        ? state.selectedGenres.filter((id) => id !== genreId)
        : [...state.selectedGenres, genreId]

      applyFiltersAndSort(state)
    }),

    setMinRating: create.reducer((state, action: PayloadAction<number>) => {
      const clamped = Math.min(10, Math.max(0, action.payload))
      state.minRating = clamped
      applyFiltersAndSort(state)
    }),

    resetFilters: create.reducer((state) => {
      state.selectedGenres = []
      state.sortType = 'default'
      state.minRating = 0
      applyFiltersAndSort(state)
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

    beginUiTask: create.reducer((state) => {
      state.uiTasksInFlight += 1
    }),

    endUiTask: create.reducer((state) => {
      state.uiTasksInFlight = Math.max(0, state.uiTasksInFlight - 1)
    }),

    beginExternalRequest: create.reducer((state) => {
      state.networkRequestsInFlight += 1
    }),

    endExternalRequest: create.reducer((state) => {
      state.networkRequestsInFlight = Math.max(0, state.networkRequestsInFlight - 1)
    }),
  }),
})

export const {
  fetchFilms,
  setCurrentCategory,
  toggleGenreFilter,
  setMinRating,
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
  beginUiTask,
  endUiTask,
  beginExternalRequest,
  endExternalRequest,
} = filmSlice.actions

export const filmReducerSort = filmSlice.reducer