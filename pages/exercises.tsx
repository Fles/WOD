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
import { Grid } from '@material-ui/core'
import { Exercise } from '../types'

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

  return (
    <div className={classes.root}>
      <button onClick={() => Router.push('/')}>START</button>
      <GridList cellHeight={280} className={classes.grid}>
        {exercises.map((exe: Exercise) => (
          <ExerciseThumb {...exe} key={exe.name} />
        ))}
      </GridList>
    </div>
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
