import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import type { BaseFilmResponse, FilmCategory } from '../components/types/types.ts'
import instance from "./../components/instance/instance"

const createFilmSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})



export const filmSlice = createFilmSlice({
  name: 'films',
  initialState: {
    films: [] as BaseFilmResponse[],
    filteredFilms: [] as BaseFilmResponse[],
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null as string | null,
    FilmCategory: 'popular' as FilmCategory,
    sortType: 'default' as string // потом прописать стили - типов сортировки
  },

  reducers: (create) => ({
    // Типизация thunk через дженерики, чтобы:
    // category был FilmCategory
    // action.meta.arg тоже был FilmCategory
    // action.payload в fulfilled был правильного типа
    //     Почему это исправляет:
    // У thunk явно задан тип аргумента FilmCategory.
    // Поэтому action.meta.arg больше не unknown.
    // У payload в fulfilled тоже корректный тип, без ручных кастов.
    fetchFilms: create.asyncThunk<{ category: FilmCategory; results: BaseFilmResponse[] }, FilmCategory,
      { rejectValue: string }>(
        async (category, { rejectWithValue }) => {
          try {

            const response = await instance.get(`/${category}`)
            console.log(response.data.results)
            return { category, results: response.data.results }
          } catch (error) {
            return rejectWithValue(`Failed to load films for ${category}`)
          }
        },
        // ? Бллок обработки сценариев
        {
          // const category = action.meta.arg
          // В pending и rejected у тебя еще нет данных payload с фильмами, но уже нужно понять, для какой рубрики поставить loading или error.
          // Через action.meta.arg ты узнаешь, какую именно ветку state обновлять: popular, top_rated, upcoming или now_playing.
          // const category = action.meta.arg - эта строка связывает конкретный запрос с конкретной рубрикой в state.
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
            state.filteredFilms = results
          },
          rejected: (state, action) => {
            const category = action.meta.arg
            state.status = 'failed'
            state.FilmCategory = category
            state.error = action.payload as string
          },
        }
      ),

    sortByPopularityIncrease: create.reducer((state) => {
      state.filteredFilms = [...state.films].sort((a, b) => a.popularity - b.popularity)
    }),

    sortByPopularityDecrease: create.reducer((state) => {
      state.filteredFilms = [...state.films].sort((a, b) => b.popularity - a.popularity)
    }),

    sortByReleaseDateIncrease: create.reducer((state) => {
      state.filteredFilms = [...state.films].sort((a, b) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      )
    }),

    sortByReleaseDateDecrease: create.reducer((state) => {

      state.filteredFilms = [...state.films].sort((a, b) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      )
    }),

    sortByRatingIncrease: create.reducer((state) => {
      // state.sortType = 'rating-down'
      state.filteredFilms = [...state.films].sort((a, b) => a.vote_average - b.vote_average)
    }),

    sortByRatingDecrease: create.reducer((state) => {
      state.filteredFilms = [...state.films].sort((a, b) => b.vote_average - a.vote_average)

    }),

    sortByTitleIncrease: create.reducer((state) => {
      state.filteredFilms = [...state.films].sort((a, b) => a.original_title > b.original_title ? 1 : -1)
    }),

    sortByTitleDecrease: create.reducer((state) => {
      state.filteredFilms = [...state.films].sort((a, b) => a.original_title < b.original_title ? 1 : -1)
    })
  })
})



export const { sortByPopularityIncrease, sortByPopularityDecrease, sortByReleaseDateIncrease, sortByReleaseDateDecrease, sortByRatingIncrease, sortByRatingDecrease, sortByTitleIncrease, sortByTitleDecrease, fetchFilms } = filmSlice.actions
export const filmReducerSort = filmSlice.reducer //? - для подключения в store


//* Логикак поиска, основные методы без жанра, с массивом полученных фильмов */
//*********************************** */
// let movies = {
//   "page": 1,
//   "results": [
//     {
//       "adult": false,
//       "backdrop_path": "/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg",
//       "genre_ids": [
//         18,
//         80
//       ],
//       "id": 278,
//       "title": "Побег из Шоушенка",
//       "original_language": "en",
//       "original_title": "The Shawshank Redemption",
//       "popularity": 48.1974,
//       "poster_path": "/yvmKPlTIi0xdcFQIFcQKQJcI63W.jpg",
//       "release_date": "1994-09-23",
//       "softcore": false,
//       "video": false,
//       "vote_average": 8.719,
//       "vote_count": 30237
//     },
//     {
//       "adult": false,
//       "backdrop_path": "/tSPT36ZKlP2WVHJLM4cQPLSzv3b.jpg",
//       "genre_ids": [
//         18,
//         80
//       ],
//       "id": 238,
//       "title": "Крёстный отец",
//       "original_language": "en",
//       "original_title": "The Godfather",
//       "popularity": 39.9109,
//       "poster_path": "/hoowzozsn0XQGtgH8nyivAMZfPN.jpg",
//       "release_date": "1972-03-14",
//       "softcore": false,
//       "video": false,
//       "vote_average": 8.686,
//       "vote_count": 22833
//     },
//     {
//       "adult": false,
//       "backdrop_path": "/kGzFbGhp99zva6oZODW5atUtnqi.jpg",
//       "genre_ids": [
//         18,
//         80
//       ],
//       "id": 240,
//       "title": "Крёстный отец 2",
//       "original_language": "en",
//       "original_title": "The Godfather Part II",
//       "popularity": 25.4571,
//       "poster_path": "/tOLQ3iRDfbwhVaw3QjDzIOS7zcu.jpg",
//       "release_date": "1974-12-20",
//       "softcore": false,
//       "video": false,
//       "vote_average": 8.571,
//       "vote_count": 13843
//     },
//     {
//       "adult": false,
//       "backdrop_path": "/zb6fM1CX41D9rF9hdgclu0peUmy.jpg",
//       "genre_ids": [
//         18,
//         36,
//         10752
//       ],
//       "id": 424,
//       "title": "Список Шиндлера",
//       "original_language": "en",
//       "original_title": "Schindler's List",
//       "popularity": 27.601,
//       "poster_path": "/4K8fGGcJP2EoGDucILnaJcOJhZl.jpg",
//       "release_date": "1993-12-15",
//       "softcore": false,
//       "video": false,
//       "vote_average": 8.568,
//       "vote_count": 17379
//     },
//     {
//       "adult": false,
//       "backdrop_path": "/w4bTBXcqXc2TUyS5Fc4h67uWbPn.jpg",
//       "genre_ids": [
//         18
//       ],
//       "id": 389,
//       "title": "12 разгневанных мужчин",
//       "original_language": "en",
//       "original_title": "12 Angry Men",
//       "popularity": 21.5875,
//       "poster_path": "/uDFEvhvKrH61KuGWWozRtbw2Rjv.jpg",
//       "release_date": "1957-04-10",
//       "softcore": false,
//       "video": false,
//       "vote_average": 8.56,
//       "vote_count": 9933
//     },
//     {
//       "adult": false,
//       "backdrop_path": "/dyJvKsNs2KP8qQnAXbRwDjblViy.jpg",
//       "genre_ids": [
//         16,
//         10751,
//         14
//       ],
//       "id": 129,
//       "title": "Унесённые призраками",
//       "original_language": "ja",
//       "original_title": "千と千尋の神隠し",
//       "popularity": 32.5404,
//       "poster_path": "/uANcal3l15d0rFb5fTXhCAhSold.jpg",
//       "release_date": "2001-07-20",
//       "softcore": false,
//       "video": false,
//       "vote_average": 8.534,
//       "vote_count": 18222
//     },
//     {
//       "adult": false,
//       "backdrop_path": "/cfT29Im5VDvjE0RpyKOSdCKZal7.jpg",
//       "genre_ids": [
//         28,
//         80,
//         53
//       ],
//       "id": 155,
//       "title": "Тёмный рыцарь",
//       "original_language": "en",
//       "original_title": "The Dark Knight",
//       "popularity": 36.2439,
//       "poster_path": "/aPtN76OjnNKLqCJ2FJBnQOIL031.jpg",
//       "release_date": "2008-07-16",
//       "softcore": false,
//       "video": false,
//       "vote_average": 8.529,
//       "vote_count": 35607
//     },
//     {
//       "adult": false,
//       "backdrop_path": "/6N5d02quKqMKqvTpOdFmBDy9scY.jpg",
//       "genre_ids": [
//         35,
//         18,
//         10749
//       ],
//       "id": 19404,
//       "title": "Непохищенная невеста",
//       "original_language": "hi",
//       "original_title": "दिलवाले दुल्हनिया ले जायेंगे",
//       "popularity": 16.8093,
//       "poster_path": "/sctBFkLHYYqaHHNJj7r1jSOkfB9.jpg",
//       "release_date": "1995-10-20",
//       "softcore": false,
//       "video": false,
//       "vote_average": 8.5,
//       "vote_count": 4579
//     },
//     {
//       "adult": false,
//       "backdrop_path": "/b6HWTOxn1xevvyHU2K9ICvaRU6g.jpg",
//       "genre_ids": [
//         14,
//         18,
//         80
//       ],
//       "id": 497,
//       "title": "Зелёная миля",
//       "original_language": "en",
//       "original_title": "The Green Mile",
//       "popularity": 28.0945,
//       "poster_path": "/lHxe8t4B0CKv4DO0C0B4rsuiG95.jpg",
//       "release_date": "1999-12-10",
//       "softcore": false,
//       "video": false,
//       "vote_average": 8.504,
//       "vote_count": 19163
//     },
//     {
//       "adult": false,
//       "backdrop_path": "/2u7zbn8EudG6kLlBzUYqP8RyFU4.jpg",
//       "genre_ids": [
//         12,
//         14,
//         28
//       ],
//       "id": 122,
//       "title": "Властелин колец: Возвращение короля",
//       "original_language": "en",
//       "original_title": "The Lord of the Rings: The Return of the King",
//       "popularity": 34.5875,
//       "poster_path": "/x6NqCWwU1SrQnvfdmVPAuATyUgD.jpg",
//       "release_date": "2003-12-17",
//       "softcore": false,
//       "video": false,
//       "vote_average": 8.497,
//       "vote_count": 26403
//     }
//   ],
//   "total_pages": 542,
//   "total_results": 10828
// }

//
// console.log(popularityIncrease(movies["results"]))

// let popularityDecrease = (movie) => {
//   const decrease = [...movie].sort((a, b) => a.popularity - b.popularity)
//   return decrease
// }





// console.log(sortReleaseDateDecrease(movies["results"]))
// console.log(popularityRaitingDecrease(movies["results"]))
// console.log(TitleIncrease(movies["results"]))
// console.log(TitleDecrease(movies["results"]))

// return (
//   <div>
//     {movies["results"].map((movie) => (
//       <div key={movie.id}>
//         <div>Title: {movie.title}</div>
//         <div>Relise: {movie.release_date}</div>
//       </div>
//     ))}
//   </div>
// )

//*********************************** */