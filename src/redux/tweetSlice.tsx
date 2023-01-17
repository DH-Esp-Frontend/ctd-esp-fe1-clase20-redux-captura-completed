import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState{
    data: string[]
}

interface Posts {
    body: string
  }

const initialState: IState = {data: []}

export const getPosts = createAsyncThunk("tweets/getPosts", async()=>{
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data: Posts[] = await res.json()
  
    const posts = data.map(post => post.body)
  
    return posts
})


const tweetSlice = createSlice({
    name: "tweets",
    initialState,
    reducers: {
        addTweet: (state, action: PayloadAction<string>)=>{
            state.data.unshift(action.payload)
            console.log('manual',action)
        }
    },
    extraReducers: builder =>{
        builder
            .addCase(getPosts.fulfilled, (state, action: PayloadAction<string[]>)=>{
                console.log('esto',action)
                state.data.push(...action.payload)
            })
    }
})

export const { addTweet } = tweetSlice.actions

export default tweetSlice.reducer