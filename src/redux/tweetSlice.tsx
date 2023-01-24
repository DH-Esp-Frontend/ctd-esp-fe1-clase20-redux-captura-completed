import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Res,Data,IState} from "./types";
import {call, put, takeEvery} from "redux-saga/effects";

const initialState: IState = { data: [],loading:false };

function* fetchData(){
  try {
    const res: Res = yield call(() =>
      fetch("https://jsonplaceholder.typicode.com/posts")
    );
    const data: Data[] = yield res.json();

    const posts = data.map((post) => post.body);

    yield put(addTweetFetch(posts));
  } catch (error) {
    console.log(error)
  }
}
export function* fetchSaga(){
  yield takeEvery("tweets/getPosts", fetchData);
}


const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    addTweet: (state, action: PayloadAction<string>) => {
      state.data.unshift(action.payload);
    },
    getPosts:(sate)=> {sate.loading = true},
    addTweetFetch:(state, action: PayloadAction<string[]>) => {
    state.data.push(...action.payload);
    state.loading = false;
  }
  },
});

export const { addTweet, addTweetFetch,getPosts } = tweetSlice.actions;

export default tweetSlice.reducer;
