import React, { useState } from 'react'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import fetch from 'isomorphic-unfetch'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import ExerciseCard from '../ui/ExerciseCard'

const Exercises = ({ exercises }) => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justify="center"
      alignItems="center"
    >
      {exercises.map(e => (
        <Grid container item xs={6} spacing={6}>
          <Grid item>
            <ExerciseCard {...e} />
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

Exercises.getInitialProps = async function() {
  //const res = await fetch('https://api.')
  //const data = await res.json()
  const exe = await require('../public/data.json')

  return {
    exercises: exe.map(entry => entry),
  }
}

export default Exercises
