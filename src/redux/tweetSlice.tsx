import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
// import { addTweetFetch } from "../redux/tweetSlice";

interface IState{ data: string[], loading: boolean }
const initialState: IState = { data: [], loading: false }

interface Posts {
  json(): unknown;
  body: string;
}


function* fetchSaga() {
  try {
    const posts: Posts = yield call(() =>
      fetch("https://jsonplaceholder.typicode.com/posts",{method: "GET"})
    );
    const data: Posts[] = yield posts.json();
    const result = data.map((post) => post.body);

    yield put(addTweetFetch(result));
  } catch (error) {
    console.log("The error", error);
  }
}

export  function* getPosts() {
  yield takeEvery("tweets/tweetLoading", fetchSaga);
}

const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    addTweetFetch: (state, action: PayloadAction<string[]>) => {
      const { data } = state;
      data.push(...action.payload);
      state.loading = false;
    },
    addTweet: (state, action: PayloadAction<string>) => {
      const { data } = state;
        data.unshift(action.payload)
      state.loading = false;
    },
    tweetLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { addTweet, tweetLoading, addTweetFetch } = tweetSlice.actions;

export default tweetSlice.reducer