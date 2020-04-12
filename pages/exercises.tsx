import React, { useState } from 'react'
import Router from 'next/router'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import CardMedia from '@material-ui/core/CardMedia'
import Paper from '@material-ui/core/Paper'
import ExerciseThumb from '../components/ExerciseThumb'
import { Grid, Button, Container } from '@material-ui/core'
import { Exercise } from '../types'
import { useContext } from 'react'
import WodContext from '../components/WodContext'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 20,
    },
    grid: {},
    menuButton: {
      marginBottom: 15,
      marginRight: 15,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  })
)

const Exercises = ({ exercises }) => {
  const classes = useStyles()
  const { sequence, find, clear, shuffle } = useContext(WodContext)
  const selected = sequence
    .map(id => exercises.find(exe => id === exe.id))
    .map((exe: Exercise) => {
      return (
        <ExerciseThumb {...exe} position={find(exe.id) + 1} key={exe.name} />
      )
    })

  const unSelected = exercises
    .filter(e => find(e.id) < 0)
    .map((exe: Exercise) => {
      return (
        <ExerciseThumb {...exe} position={find(exe.id) + 1} key={exe.name} />
      )
    })

  return (
    <Container maxWidth="md" className={classes.root}>
      <Button
        size="small"
        className={classes.menuButton}
        color="secondary"
        variant="contained"
        startIcon={<HighlightOffIcon />}
        onClick={clear}
      >
        {sequence.length > 0 ? 'deselect all' : 'select all'}
      </Button>
      <Button
        size="small"
        className={classes.menuButton}
        color="secondary"
        variant="contained"
        startIcon={<ShuffleIcon />}
        onClick={shuffle}
      >
        shuffle
      </Button>
      <GridList className={classes.grid}>
        {selected.concat(unSelected)}
      </GridList>
    </Container>
  )
}

Exercises.getInitialProps = async function() {
  //const res = await fetch('https://api.')
  //const data = await res.json()
  const exe: Exercise[] = await require('../public/exercises.json')

  return {
    exercises: exe.map(entry => entry),
  }
}

export default Exercises
