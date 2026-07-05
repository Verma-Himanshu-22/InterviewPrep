import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
function Timer({ timeLeft, totalTime }) {
    const percentage = (timeLeft / totalTime) * 100
  return (
    <div className='w-20 h-20'>
        <CircularProgressbar
        value={percentage}
        text={`${timeLeft}s`}
        styles={buildStyles({
          textSize: "24px",
          pathColor: "#22c55e",
          textColor: "#a7f3d0",
          trailColor: "#334155",
          backgroundColor: "#020617",
        })}
        />
    </div>
  )
}

export default Timer
