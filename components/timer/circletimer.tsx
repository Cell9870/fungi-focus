import { CountdownCircleTimer } from "react-countdown-circle-timer"

interface CircleTimerProps {
    myKey: number
    started: boolean
    duration: number
}

export default function CircleTimer({ myKey, started, duration }: CircleTimerProps) {
    function formatTime(remainingTime: number) {
        const hour = Math.floor(remainingTime / 3600)
        const min = Math.floor((remainingTime % 3600) / 60)
        const sec = remainingTime % 60

        const strHour = hour ? ((hour < 10 ? "0" : "") + hour + " : ") : "";

        return strHour
            + (min < 10 ? "0" : "") + min + " : "
            + (sec < 10 ? "0" : "") + sec
    }

    return (
        <div style={{ display: 'flex', justifyContent: "center" }}>
            <CountdownCircleTimer
                key={myKey}
                isPlaying={started}
                duration={duration}
                colors="url(#green-lime)"
                updateInterval={1}
                strokeWidth={20}
            >
                {({ remainingTime }) => {
                    return formatTime(remainingTime);
                }}
            </CountdownCircleTimer>
            <svg width="0" height="0">
                <defs>
                    <linearGradient id="green-lime" x1="1" y1="0" x2="0" y2="0">
                        <stop offset={"25%"} stopColor="green" />
                        <stop offset={"95%"} stopColor="lime" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}