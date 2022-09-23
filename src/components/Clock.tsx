import "./Clock.css"

type clockProps = {
    hours: number,
    minutes: number,
    seconds?: number,
    ampm: "am" | "pm"
}

const isClockProps = (x: any) : x is clockProps => {
    return x.hours && x.minutes && x.seconds && (x.ampm === "am"|| x.ampm === "pm")
}

const Digit = ({val} : {val: number}) => {
    const clockHeight = getComputedStyle(document.body).getPropertyValue("--clock-height")
    const style = {
        marginTop: `calc(${clockHeight} * ${-val})`
    }
    return <div style={style} className="Digit">
        {[...Array(10).keys()].map(n => <div key={n} className="digit-pane">
            {n === val ?
                <div className="highlight">{n}</div>
                : n}
        </div>)}
    </div>
} 

const Clock = (props : clockProps | {date: Date, noSeconds?: boolean}) => {
    const {hours, minutes, seconds, ampm} = 
        isClockProps(props) ? props
        : {
            hours: props.date.getHours(),
            minutes: props.date.getMinutes(),
            seconds: props.date.getSeconds(),
            ampm: props.date.toLocaleString('en-US', { hour12: true }).slice(-2).toLowerCase()
        }
    const hoursArr = [Math.floor(hours / 10), hours % 10]
    const minutesArr = [Math.floor(minutes / 10), minutes % 10]
    const noSeconds = function() {
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
    const secondsArr = noSeconds ? null : [Math.floor(seconds / 10), seconds % 10]
    return <div className="Clock">
        <Digit val={hoursArr[0]} /><Digit val={hoursArr[1]} />
        :<Digit val={minutesArr[0]} /><Digit val={minutesArr[1]} />
        {!noSeconds && <>
            :<Digit val={secondsArr[0]} /><Digit val={secondsArr[1]} />
        </>}
        <div className="ampm">{ampm}</div>
    </div>
}

export default Clock