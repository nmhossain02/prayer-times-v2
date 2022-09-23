import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Clock from './components/Clock'

function App() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
  }, [])

  return (
    <div className="App">
      <Clock date={currentTime} />
    </div>
  )
}

export default App
