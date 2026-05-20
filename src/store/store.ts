import { configureStore } from "@reduxjs/toolkit"
import { appReducer, appSlice } from "./app-slice.ts"




export const store = configureStore({
  reducer: {
    film: filmReducer, // возможно стоит сделать так: [filmSlice.name]: filmReducer, - от чего это зависит ?
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch