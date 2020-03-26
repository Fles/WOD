import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { green } from '@material-ui/core/colors'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 200,
      height: 200,
      margin: 5,
      cursor: 'pointer',
    },
    media: {
      display: 'block',
      height: 150,
      width: 150,
      margin: 'auto',
      marginTop: 20,
    },
    positionIcon: {
      position: 'absolute',
    },
    avatar: {
      backgroundColor: green[500],
    },
  })
)

export default function ExerciseThumb({
  media,
  name,
  difficulty,
  addItem,
  position,
}) {
  const classes = useStyles()

  return (
    <Card className={classes.root} onClick={_ => addItem(name)} key={name}>
      <IconButton aria-label="icon" className={classes.positionIcon}>
        <Avatar
          aria-label="position"
          className={position ? classes.avatar : null}
        >
          {position !== 0 ? position : <RadioButtonUncheckedIcon />}
        </Avatar>
      </IconButton>
      <CardMedia
        className={classes.media}
        component="video"
        image={`/images/${media}.mp4`}
        title={name}
        autoPlay={false}
        loop={true}
      />
      <Typography align="center">{name}</Typography>
    </Card>
  )
}
