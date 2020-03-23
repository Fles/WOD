import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
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
}))
export default function ExerciseCard({
  name,
  media,
  time,
  progress,
  instructions = '',
  target = [],
  difficulty = '',
}) {
  const classes = useStyles()

  const normalise = value => ((value - 0) * 100) / (time - 0)
  const [expanded, setExpanded] = React.useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

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
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Target muscles: {target.join(', ')}</Typography>
          <Typography paragraph>Difficulty: {difficulty}</Typography>
          <Typography paragraph>Instructions: {instructions}</Typography>
        </CardContent>
      </Collapse>

      {progress && (
        <LinearProgress
          variant="determinate"
          value={100 - normalise(progress)}
        />
      )}
    </Card>
  )
}
