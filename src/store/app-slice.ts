import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import type { BaseFilmResponse } from '../components/types/types.ts'
import instance from "./../components/instance/instance"

const createFilmSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})


export const filmSlice = createFilmSlice({
  name: 'films',
  initialState: {
    films: [] as BaseFilmResponse[],
    filteredFilms: [] as BaseFilmResponse[],
    sortType: 'default' // потом прописать стили - типов сортировки
  },

  reducers: (create) => ({
    // ! Реализовать логику в редьюссерах
    // 1. Реализовать поиск по названию фильма

    // 2. Поиск фильмов по категориям:
    // ? По идее одна функция, куда я запихиваю одну из текущих категорий
    // 2.1. Популярные фильмы(Popular Movies) - посмотреть где эта категория лежит после прихода с сервера
    // 2.2. По высокому рейтингу(Top Rated Movies) - это тот который в кружечке, тоже приходит с сервера
    // 2.3. Предстоящие фильмы (Upcoming Movies)
    // 2.4 Сейчас идущие фильмы (Now Playing Movies)
    // ? По нажатии на кнопку должен меняться URL. Это значит, что если ты  нажал на кнопку Top Rated и потом перегрузил страницу, то должен остаться в категории Top Rated
    // ? Кнопка активной страницы должна быть визуально выделена, чтобы пользователь видел, что сейчас выбрано
    // ? Внизу должна быть реализована пагинация или бесконечный скролл (на выбор)

    // Filtered Movies Page блок фильтрации и сортировки слево 
    // https://developer.themoviedb.org/reference/discover-movie - документация
    // 6.1.1. Сортировка (sort_by)

    //     По популярности (убывание)
    //     По популярности (возрастание)
    //     По рейтингу (убывание)
    //     По рейтингу (возрастание)
    //     По дате выпуска (убывание)
    //     По дате выпуска (возрастание)
    //     По названию (А-Я)
    //     По названию (Я-А)

    // 6.1.2. Фильтрация по рейтингу (vote_average.gte / vote_average.lte)

    //     Показывай фильмы с рейтингом от 0 до 10 с шагом 0.1
    //     Реализуй debounce с задержкой в 200 мс, чтобы при движении ползунка не улетала 100 запросов

    // 6.1.3. Фильтрация по жанрам (with_genres)
    // https://developer.themoviedb.org/reference/genre-movie-list
    // Отрисуй кнопки с жанрами фильмов, при нажатии на которые фильмы должны фильтроваться
    // Фильтровать фильмы можно по нескольким жанрам одновременно, то есть можно одновременно выбрать несколько жанров

    // 6.1.4. Сброс фильтров
    // Реализуй кнопку сброса фильтров, при нажатии на которую сортировки и жанры откатываются к первоначальному состоянию

    // 6.2. Блок результатов


    // Страница поиска фильма (Search Page)

    /*  Search Page — страница поиска фильмов по названию

    Вводишь название фильма, нажимаешь кнопку Search и должен увидеть карточки фильмов, удовлетворяющих введенному названию
    Если название фильма не введено, то ты должен увидеть об этом надпись. Например: "Enter a movie title to start searching"
    Если фильма с таким названием не существует, то ты должен увидеть об этом надпись. Например: "No matches found for "ыыыыыы""
    При нажатии на крестик (<input type="search">), результат должен сброситься в первоначальное состояние
    Внизу должна быть реализована пагинация или бесконечный скролл (на выбор)*/


    // Страница "Любимые фильмы" (Favorites Page)
    // При нажатии в карточке фильма на кнопку "❤️ Любимые" фильм должен сохраниться в localStorage. При повторном нажатии в карточке фильма на кнопку "❤️ Любимые" фильм должен удалиться из localStorage.
    // Рекомендуем в localStorage хранить id, title, posterUrl, voteAverage

    fetchFilms: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          // dispatch(changeStatusAC({ status: 'loading' })) - передаем статус нашей крутилки при загрузке (не забыть убрать в компоненте)
          // проверка на отсутствие загрузки наших фильмов - указано время
          // await new Promise((resolve)=>setTimeout(resolve, 5000))
          const response = await instance.get('/top_rated')
          // dispatch(changeStatusAC({ status: 'succeeded' })) - успех запроса
          return { films: response.data.results }
        } catch (error) {
          // dispatch(changeStatusAC({ status: 'failed' }))
          return rejectWithValue('Failed to load films')
          // }, 
          // ? Бллок возможной вставки -обработки сценариев
          //        {
          //   pending: (state) => {
          //     state.status = 'loading'
          //   },
          //   fulfilled: (state, action) => {
          //     state.status = 'succeeded'
          //     state.films = action.payload
          //     state.filteredFilms = action.payload
          //   },
          //   rejected: (state, action) => {
          //     state.status = 'failed'
          //     state.error = action.payload as string
          //   },
          // }
          // ? -------------------------------------------

          {
            //   fulfilled: (state, action) => {
            //! Переношу в экстра-редъюссер
            // тут что выполниться в случае успеха - добавить сердечко
            // В fulfilled ты записываешь и films, и filteredFilms.
            // }
          }
        }
      }),

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