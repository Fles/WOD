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

export default function ExerciseThumb({ id, media, name, position }) {
  const classes = useStyles()
  const { add, remove } = useContext(WodContext)

  return (
    <Card
      key={name}
      className={classes.root}
      onClick={() => (position > 0 ? remove(id) : add(id))}
    >
      <IconButton aria-label="icon" className={classes.positionIcon}>
        <Avatar
          aria-label="position"
          className={position > 0 ? classes.avatar : null}
        >
          {position > 0 ? position : <RadioButtonUncheckedIcon />}
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
