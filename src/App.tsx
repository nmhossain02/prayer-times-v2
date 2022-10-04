import { useEffect, useRef, useState } from 'react'
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
  const [now, setNow] = useState<string>("Isha")
  const updateNow = () => {
    type timeType = { label: string, minutes: number }
    const labeledMinutes: timeType[] = Object.keys(times).map(time => {
      const timeArr = times[time].split(/[: %]+/)
      return {
        label: time,
        minutes: ( (timeArr[0] as number) % 12 + (timeArr[2] === 'pm' ? 12 : 0) ) * 60 + (+timeArr[1])
      }
    })
    labeledMinutes.sort((a: timeType, b: timeType) => a.minutes - b.minutes)
    const currentMinutes = currentTime.getMinutes() + currentTime.getHours() * 60
    let currNow = "Isha"
    labeledMinutes.every(minutes => {
      if (minutes.minutes > currentMinutes) {
        return false;
      } else {
        currNow = minutes.label
        return true;
      }
    })
    setNow(currNow)
  }

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date())
    }, 500)
    const fetchTimes = () => {
      fetch("https://www.islamicfinder.us/index.php/api/prayer_times?country=US&zipcode=30309&method=2")
        .then(res => res.json())
        .then(res => {
          setTimes(res.results)
          updateNow()
        })
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
          Created by Nabeel Hossain
        </div>
      </div>
      <div className="side-bar">
        {Object.keys(times).map(time => {
          const timeArr = times[time].split(/[: %]+/)
          return <div key={time} className={`time-item${time === now ? " now" : ""}`}>
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
