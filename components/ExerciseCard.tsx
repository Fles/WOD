import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LinearProgress from '@material-ui/core/LinearProgress'

export default function ExerciseCard({ name, media, time, progress }) {
  const normalise = value => ((value - 0) * 100) / (time - 0)
  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="time">{progress || time}</Avatar>}
        action={
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        }
        title={<h3>{name}</h3>}
      />
      <CardMedia
        component="video"
        image={`/images/${media}.mp4`}
        title={name}
        autoPlay={true}
        loop={true}
      />
      {progress && (
        <LinearProgress
          variant="determinate"
          value={100 - normalise(progress)}
        />
      )}
    </Card>
  )
}
