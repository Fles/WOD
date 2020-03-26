import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red, green } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 200,
      margin: 15,
    },
    media: {},
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: green[500],
    },
  })
)

export default function ExerciseCardSmall({
  media,
  name,
  difficulty,
  addItem,
  position,
}) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className={classes.root} onClick={_ => addItem(name)} key={name}>
      <CardHeader
        avatar={null}
        action={
          <IconButton aria-label="icon">
            <Avatar
              aria-label="position"
              className={position ? classes.avatar : null}
            >
              {position !== 0 ? position : <RadioButtonUncheckedIcon />}
            </Avatar>
          </IconButton>
        }
        title={name}
        subheader={difficulty}
      />
      <CardMedia
        className={classes.media}
        component="video"
        image={`/images/${media}.mp4`}
        title={name}
      />
    </Card>
  )
}
