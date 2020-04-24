import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import StopIcon from '@material-ui/icons/Stop'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import { Container, Typography } from '@material-ui/core'

export default function LoginForm({ smit }) {
  const [data, setData] = useState('')

  return (
    <Container>
      <Typography
        component="h2"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        <Input type="text" onChange={event => setData(event.target.value)} />
        <IconButton
          onClick={() => smit(data)}
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PlayCircleOutlineIcon />
        </IconButton>
      </Typography>
    </Container>
  )
}
