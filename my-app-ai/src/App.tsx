
import { Fragment } from 'react/jsx-runtime'
import './App.css'
import { Header } from './components/Header/Header'
import Homepage from './components/Home/Homepage'
import Technology from './components/Technology/Technology'
import TrafficSignClassification from './components/Function/TrafficSign'
import VideoEmotion from './components/Function/VideoEmotion'
function App() {

  return (
    <Fragment>
    <div className='w-full px-10 py-5 mb-20 flex flex-col items-center justify-between md:flex-row '>
      <Header />
    </div>
    <Homepage />
    <Technology />
    <TrafficSignClassification />
    <VideoEmotion />
    </Fragment>
    
  )
}

export default App
