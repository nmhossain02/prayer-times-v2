import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Clock from './components/Clock'

type timesType = {
  [index: string]: any,
  Fajr: string,
  Duha: string,
  Dhuhr: string,
  Asr: string,
  Maghrib: string,
  Isha: string
}

const defaultTimes: timesType = {
  Fajr: "12:34 am",
  Duha: "12:34 am",
  Dhuhr: "12:34 am",
  Asr: "12:34 am",
  Maghrib: "12:34 am",
  Isha: "12:34 am"
}

function App() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [times, setTimes] = useState<timesType>(defaultTimes)

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date())
    }, 500)
    const fetchTimes = () => {
      fetch("http://www.islamicfinder.us/index.php/api/prayer_times?country=US&zipcode=30309&method=2")
        .then(res => res.json())
        .then(res => setTimes(res.results))
    }
    fetchTimes()
    setInterval(fetchTimes, 1000 * 30)
  }, [])

  return (
    <div className="App">
      <div className="big-clock-wrap">
        <Clock noSeconds={false} date={currentTime} />
      </div>
      <div className="message">
        <div className="date">
          {(new Date()).toLocaleDateString()}
        </div>
        <div className="time-text">
          Message
        </div>
      </div>
      <div className="side-bar">
        {Object.keys(times).map(time => {
          const timeArr = times[time].split(/[: %]+/)
          return <div className="time-item">
            <div className="time-label">
              {time}
            </div>
            <Clock hours={timeArr[0]} minutes={timeArr[1]} ampm={timeArr[2]}></Clock>
          </div>
        })}
      </div>
    </div>
  )
}

export default App
