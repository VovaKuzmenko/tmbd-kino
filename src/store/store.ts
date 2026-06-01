import { configureStore } from "@reduxjs/toolkit"
import { filmReducerSort, filmSlice } from "./app-slice.ts"




export const store = configureStore({
  reducer: {
    [filmSlice.name]: filmReducerSort
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch