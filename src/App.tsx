import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Clock from './components/Clock'

function App() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date())
    }, 500)
  }, [])

  return (
    <div className="App">
      <div className="big-clock-wrap">
        <Clock noSeconds={false} date={currentTime} />
      </div>
    </div>
  )
}

export default App
