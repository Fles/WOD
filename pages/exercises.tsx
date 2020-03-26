import React, { useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import CardMedia from '@material-ui/core/CardMedia'
import ExerciseCardSmall from '../ui/ExerciseCardSmall'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: '100%',
      height: '100%',
      paddingLeft: 350,
      paddingRight: 350,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  })
)

const Exercises = ({ exercises }) => {
  const classes = useStyles()
  const [sequence, setSequence] = useState([])
  console.log(sequence)
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
      <GridList cellHeight={280} className={classes.gridList}>
        {exercises.map(exe => (
          <ExerciseCardSmall
            {...exe}
            key={exe.name}
            addItem={addItem}
            position={sequence.indexOf(exe.name) + 1}
          ></ExerciseCardSmall>
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
