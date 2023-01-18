import { configureStore } from "@reduxjs/toolkit";
import tweetReducer from "./tweetSlice";
// import createSagaMiddleware from "redux-saga";-->G1
// import {getPosts} from "../redux/tweetSlice"-->G2


    
// const saga = createSagaMiddleware();-->G3


const store = configureStore({
    reducer: tweetReducer,
    //     middleware:[saga] -->G4
});
// saga.run(getPosts); --->G5

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;