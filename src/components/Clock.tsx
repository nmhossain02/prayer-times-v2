import { useEffect, useRef } from "react"
import "./Clock.css"

type clockProps = {
    hours: number,
    minutes: number,
    seconds?: number,
    ampm: "am" | "pm"
}

const isClockProps = (x: any): x is clockProps => {
    return x.hours && x.minutes && (x.ampm === "am" || x.ampm === "pm")
}

const Digit = ({ val, clockHeight = "var(--clock-height)" }: { val: number, clockHeight?: string }) => {
    const style = {
        translate: `0 calc(${clockHeight} * ${-val})`,
        height: clockHeight
    }
    return <div style={style} className="Digit">
        {[...Array(10).keys()].map(n => <div style={{ height: clockHeight }} key={n} className="digit-pane">
            <div className={n === val ? "highlight" : "lowlight"}>{n}</div>
        </div>)}
    </div>
}

const Clock = (props: clockProps | { date: Date, noSeconds?: boolean }) => {
    const ref = useRef<any>()
    const clockHeight = useRef<string>("var(--clock-height)")
    useEffect(() => {
        clockHeight.current = getComputedStyle(ref.current).fontSize
    }, [])
    const { hours, minutes, seconds, ampm } =
        isClockProps(props) ? props
            : {
                hours: (props.date.getHours() - 1) % 12 + 1,
                minutes: props.date.getMinutes(),
                seconds: props.date.getSeconds(),
                ampm: props.date.toLocaleString('en-US', { hour12: true }).slice(-2).toLowerCase()
            }
    const hoursArr = [Math.floor(hours / 10), hours % 10]
    const minutesArr = [Math.floor(minutes / 10), minutes % 10]
    const noSeconds = function () {
        if (isClockProps(props))
            return props.seconds === undefined
        else {
            if (props.noSeconds !== undefined) {
                return props.noSeconds
            } else {
                return false
            }
        }
    }()
    const secondsArr = noSeconds ? null : [Math.floor((seconds || 0) / 10), (seconds || 0) % 10]
    const style = {
        height: `calc(${clockHeight.current})`
    }
    return <div ref={ref} style={style} className="Clock">
        <Digit clockHeight={clockHeight.current} val={hoursArr[0]} /><Digit clockHeight={clockHeight.current} val={hoursArr[1]} />
        <span className="small-font">:</span><Digit clockHeight={clockHeight.current} val={minutesArr[0]} /><Digit clockHeight={clockHeight.current} val={minutesArr[1]} />
        {!noSeconds && <>
            <span className="small-font">:</span><Digit clockHeight={clockHeight.current} val={secondsArr ? secondsArr[0] : 0} /><Digit clockHeight={clockHeight.current} val={secondsArr ? secondsArr[1] : 0} />
        </>}
        <div className="small-font ampm">{ampm}</div>
    </div>
}

export default Clock