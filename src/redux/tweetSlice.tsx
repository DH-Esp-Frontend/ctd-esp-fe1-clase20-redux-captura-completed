import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Res, IState, Posts } from "./types";

const initialState: IState = { data: [], loading: false };

export const getPosts = createAsyncThunk("tweets/getPosts", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data: Posts[] = await res.json();

  const posts = data.map((post) => post.body);

  return posts;
});




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
