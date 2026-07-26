import {
  configureStore,
  isRejected,
  type Middleware,
} from '@reduxjs/toolkit'
import { filmReducerSort, filmSlice } from './app-slice.ts'
import { pushToast } from '../shared/notifications'

const errorToastMiddleware: Middleware = () => (next) => (action) => {
  if (isRejected(action) && !action.meta?.aborted) {
    pushToast({
      kind: 'error',
      title: 'Error',
      message: action.error?.message ?? 'Unexpected error',
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