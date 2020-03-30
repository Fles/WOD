import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { green } from '@material-ui/core/colors'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import { useContext } from 'react'
import WodContext from '../components/WodContext'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 170,
      height: 170,
      margin: 5,
      cursor: 'pointer',
    },
    media: {
      display: 'block',
      height: 170,
      width: 170,
      margin: 'auto',
      marginTop: '-15px',
    },
    positionIcon: {
      maxHeight: 30,
    },
    avatar: {
      backgroundColor: green[500],
    },
    title: {
      marginLeft: 10,
      fontSize: '0.55em',
    },
  })
)

export default function ExerciseThumb({ id, media, name, difficulty }) {
  const classes = useStyles()
  const { sequence, add, remove, find } = useContext(WodContext)
  const position = find(id) + 1
  const inSequence = position > 0

  return (
    <Card
      key={name}
      className={classes.root}
      onClick={() => (inSequence ? remove(id) : add(id))}
    >
      <IconButton aria-label="icon" className={classes.positionIcon}>
        <Avatar
          aria-label="position"
          className={inSequence ? classes.avatar : null}
        >
          {inSequence ? position : <RadioButtonUncheckedIcon />}
        </Avatar>
        <Typography className={classes.title}>{name}</Typography>
      </IconButton>
      <CardMedia
        className={classes.media}
        component="video"
        image={`/images/${media}.mp4`}
        title={name}
        autoPlay={false}
        loop={true}
      />
    </Card>
  )
}
