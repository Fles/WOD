import React from 'react'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/core/styles'
import { green, red, orange } from '@material-ui/core/colors'
import { Exercise } from '../types'

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
  orange: {
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
  },
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
  green: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
  },
  avatarText: {
    fontSize: 16,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}))
export default function ExerciseCard({
  name,
  media,
  time,
  progress,
  instructions = '',
  target = [],
  difficulty = 'easy',
  type,
}: Exercise): JSX.Element {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const avatarColor = type => {
    if (type === 'rest') {
      return 'green'
    }
    if (type === 'prepare') {
      return 'orange'
    }
    if (type === 'cool-down') {
      return 'green'
    }
    return 'red'
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar className={classes[avatarColor(type)]} aria-label="progress">
            <span className={classes.avatarText}>{progress || time}'</span>
          </Avatar>
        }
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
          <Typography paragraph>Difficulty: {difficulty}</Typography>
          <Typography paragraph>Instructions: {instructions}</Typography>
          {target.map(data => {
            return <Chip key={data} label={data} className={classes.chip} />
          })}
        </CardContent>
      </Collapse>
    </Card>
  )
}
