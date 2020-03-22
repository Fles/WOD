import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import StopIcon from '@material-ui/icons/Stop'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'
import IconButton from '@material-ui/core/IconButton'

export default function Player({ duration = 0 }) {
  const [seconds, setSeconds] = useState(duration)
  const [isActive, setIsActive] = useState(false)

  function toggle() {
    setIsActive(!isActive)
  }

  function reset() {
    setSeconds(duration)
    setIsActive(false)
  }

  React.useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        seconds > 0 && setSeconds(seconds => seconds - 1)
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, seconds])

  return (
    <>
      {isActive ? (
        <IconButton aria-label="pause" onClick={_ => toggle()}>
          <PauseCircleOutlineIcon />
        </IconButton>
      ) : (
        <IconButton
          aria-label="play"
          onClick={_ => {
            toggle()
          }}
        >
          <PlayCircleOutlineIcon />
        </IconButton>
      )}
      <IconButton aria-label="stop" onClick={_ => reset()}>
        <StopIcon />
      </IconButton>
      <br />
      {seconds}
    </>
  )
}
