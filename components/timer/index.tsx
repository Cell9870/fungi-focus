import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface CircleTimerProps {
  myKey: number;
  started: boolean;
  duration: number;
  onComplete: () => void;
}

export default function CircleTimer({
  myKey,
  started,
  duration,
  onComplete,
}: CircleTimerProps) {
  function formatTime(remainingTime: number) {
    const hour = Math.floor(remainingTime / 3600);
    const min = Math.floor((remainingTime % 3600) / 60);
    const sec = remainingTime % 60;

    const strHour = hour ? (hour < 10 ? "0" : "") + hour + " : " : "";

    return (
      strHour +
      (min < 10 ? "0" : "") +
      min +
      " : " +
      (sec < 10 ? "0" : "") +
      sec
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CountdownCircleTimer
        key={myKey}
        isPlaying={started}
        duration={duration}
        colors="url(#blue-cyan)"
        updateInterval={0}
        strokeWidth={30}
        onComplete={onComplete}
        size={200}
        trailColor="#FFFFFF"
      >
        {({ remainingTime }) => {
          return formatTime(remainingTime);
        }}
      </CountdownCircleTimer>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="blue-cyan" x1="2" y1="2" x2="0" y2="0">
            <stop offset={"25%"} stopColor="blue" />
            <stop offset={"95%"} stopColor="cyan" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
