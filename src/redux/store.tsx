import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {getPosts} from "../redux/tweetSlice"
import tweetReducer from "./tweetSlice";

/** 1-Store: Instalar saga
    - traer import createSagaMiddleware from "redux-saga";
    - import fetchSaga from "../sagas/index";
**/

const saga = createSagaMiddleware();
const store = configureStore({
    reducer: tweetReducer,
    middleware:[saga]
})

saga.run(getPosts);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store