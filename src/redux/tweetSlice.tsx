import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";//-->G6
import { Res, IState, Posts } from "./types";

const initialState: IState = { data: [], loading: false };

export const getPosts = createAsyncThunk("tweets/getPosts", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data: Posts[] = await res.json();

  const posts = data.map((post) => post.body);

  return posts;
});
// function* fetchSaga(){
//   try{}catch(error){}-->G7
// }

function* fetchTweets() {

//  const rest = yield call(()=>)-->G8

// yield put(addTweetFetch(posts));-->G9

  try {
    const res: Res = yield call(() =>
      fetch("https://jsonplaceholder.typicode.com/posts")
    );
    const data: Posts[] = yield res.json();
    const posts = data.map((post) => post.body);

    yield put(addTweetFetch(posts));
  } catch (error) {
    console.log("The error", error);
  }
}


export  function* fetchSaga() {
  yield takeEvery("tweets/getPosts", fetchTweets);
}

// export function* fetchSaga(){ -->G10
//   yield takeEvery("", );
// }

const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    addTweet: (state, action: PayloadAction<string>) => {
      state.data.unshift(action.payload);
    },
    getPosts: (state) => {
      state.loading = true;
    },
    // addTweetFetch: (state, action: PayloadAction<string[]>) => {
    //   state.data.push(...action.payload);
    //   state.loading = false;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getPosts.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.data.push(...action.payload);
      }
    );
  },
});

export const { addTweet } = tweetSlice.actions;

export default tweetSlice.reducer;
