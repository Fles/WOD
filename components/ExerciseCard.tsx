import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'

export default function ExerciseCard(props) {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <b>45'</b>
          </Avatar>
        }
        action={
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        }
        title={<h3>{props.name}</h3>}
      />

      <CardMedia
        component="video"
        image={`/images/${props.media}.mp4`}
        title={props.name}
        autoPlay={true}
        loop={true}
      />
    </Card>
  )
}
