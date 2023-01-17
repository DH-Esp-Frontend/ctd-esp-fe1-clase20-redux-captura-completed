import { configureStore } from "@reduxjs/toolkit";
import tweetReducer from "./tweetSlice";


const store = configureStore({
    reducer: tweetReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store