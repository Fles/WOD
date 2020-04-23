import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import StopIcon from '@material-ui/icons/Stop'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'
import IconButton from '@material-ui/core/IconButton'

export default function LoginForm({ submit }) {
  const [data, setData] = useState('')

  return (
    <>
      <input type="text" onChange={event => setData(event.target.value)} />
      <button onClick={() => submit(data)}>></button>
    </>
  )
}
