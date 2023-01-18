import { useAppDispatch, useAppSelector } from '../redux/hooks'
import {tweetLoading} from "../redux/tweetSlice";
import Tweet from './Tweet'




const Tweets = () => {
    const {data,loading} = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    return (
      <>
        {data.length != 0 ? data.map((tweet,index) => <Tweet key={index} content={tweet} loading={loading}/>):null}
        <button className="btn-fetch" onClick={() => dispatch(tweetLoading())}>
          Fetch More
        </button>
      </>
    );
}

export default Tweets