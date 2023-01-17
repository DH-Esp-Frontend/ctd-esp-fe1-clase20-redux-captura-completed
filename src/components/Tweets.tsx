import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { getPosts } from '../redux/tweetSlice'
import Tweet from './Tweet'




const Tweets = () => {
    const data = useAppSelector(state => state.data)
    const dispatch = useAppDispatch()

    return (
    <>
        {data.length 
            ? (data.map(tweet => (
                <Tweet content={tweet} />
              ))
              )
            : null
        }
        <button className='btn-fetch' onClick={()=> dispatch(getPosts())}>Fetch More</button>
    </>
  )
}

export default Tweets