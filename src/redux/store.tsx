import { configureStore } from "@reduxjs/toolkit";
import tweetReducer from "./tweetSlice";
import createSagaMiddleware from "redux-saga";
import {fetchSaga} from "./tweetSlice";

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: tweetReducer,
  middleware:[saga]
});

saga.run(fetchSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
