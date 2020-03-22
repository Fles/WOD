import React from 'react'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import fetch from 'isomorphic-unfetch'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import ExerciseCard from '../components/ExerciseCard'
import RestCard from '../components/RestCard'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 50,
    },
  })
)

const Index = ({ exercises }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs={9}>
          <Paper>
            <ExerciseCard {...exercises[1]} key={exercises[1].name} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <RestCard />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper></Paper>
        </Grid>
      </Grid>
    </div>
  )
}

Index.getInitialProps = async function() {
  //const res = await fetch('https://api.')
  //const data = await res.json()
  const exe = await require('../public/data.json')

  return {
    exercises: exe.map(entry => entry),
  }
}

export default Index
