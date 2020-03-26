import React, { useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import CardMedia from '@material-ui/core/CardMedia'
import Paper from '@material-ui/core/Paper'
import ExerciseThumb from '../ui/ExerciseThumb'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    grid: {},
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  })
)

const Exercises = ({ exercises }) => {
  const classes = useStyles()
  const [sequence, setSequence] = useState([])

  const addItem = name => {
    if (!sequence.includes(name)) {
      setSequence([...sequence, name])
    } else {
      setSequence(
        [...sequence].filter(function(item) {
          return item !== name
        })
      )
    }
  }

  return (
    <div className={classes.root}>
      <GridList cellHeight={280} className={classes.grid}>
        {exercises.map(exe => (
          <ExerciseThumb
            {...exe}
            key={exe.name}
            addItem={addItem}
            position={sequence.indexOf(exe.name) + 1}
          />
        ))}
      </GridList>
    </div>
  )
}

Exercises.getInitialProps = async function() {
  //const res = await fetch('https://api.')
  //const data = await res.json()
  const exe = await require('../public/exercises.json')

  return {
    exercises: exe.map(entry => entry),
  }
}

export default Exercises
