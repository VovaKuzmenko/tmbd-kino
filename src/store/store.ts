import {
  configureStore,
  isRejected,
  isRejectedWithValue,
  type Middleware,
} from '@reduxjs/toolkit'
import { filmReducerSort, filmSlice } from './app-slice.ts'
import { pushToast } from '../shared/notifications'

const errorToastMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const payload = action.payload as { message?: string; status?: number } | undefined
    const messageBase = payload?.message ?? 'Не удалось выполнить запрос'
    const message =
      typeof payload?.status === 'number'
        ? messageBase + ' (HTTP ' + payload.status + ')'
        : messageBase

    pushToast({
      kind: 'error',
      title: 'Ошибка запроса',
      message,
    })
  } else if (isRejected(action) && !action.meta?.aborted) {
    pushToast({
      kind: 'error',
      title: 'Ошибка',
      message: action.error?.message ?? 'Неожиданная ошибка',
    })
  }

  return next(action)
}

export const store = configureStore({
  reducer: {
    [filmSlice.name]: filmReducerSort,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(errorToastMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch