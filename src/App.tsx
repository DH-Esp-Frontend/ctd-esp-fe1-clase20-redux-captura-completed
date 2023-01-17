import { useState } from 'react'
import Tweets from './components/Tweets'
import Avatar from './components/Avatar'
import { useAppDispatch } from './redux/hooks'
import { addTweet } from './redux/tweetSlice'

function App() {
  const dispatch = useAppDispatch()
  const [text, setText] = useState<string>("")

  const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent)=>{
      e.preventDefault()
      dispatch(addTweet(text))
      setText("")
  }


  return (
    <div className="App">
      <div className='form'>
        <Avatar/>

        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} value={text} type="text" placeholder='¿En qué estas pensando?'/>
          <button type='submit'>Tweet</button>
        </form>
      </div>
      
      <Tweets />
    </div>
  )
}

export default App
