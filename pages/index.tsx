import React, { useState } from 'react'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import fetch from 'isomorphic-unfetch'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import ExerciseCard from '../components/ExerciseCard'

const PREPARE_TIME = 10
const EXERCISE_TIME = 45
const REST_TIME = 15
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 50,
    },
  })
)

const Index = ({ exercises }) => {
  const classes = useStyles()
  let [current, setCurrent] = useState(0)

  const [seconds, setSeconds] = useState(PREPARE_TIME)
  const [isActive, setIsActive] = useState(true)

  function toggle() {
    setIsActive(!isActive)
  }

  function reset() {
    setSeconds(EXERCISE_TIME)
    setIsActive(false)
  }

  React.useEffect(() => {
    let interval = null
    if (seconds === 0) {
      setSeconds(exercises[current + 1].time)
      setCurrent(current => current + 1)
    }
    if (isActive) {
      interval = setInterval(() => {
        seconds > 0 && setSeconds(seconds => seconds - 1)
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, seconds])

  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs={9}>
          <Paper>
            <ExerciseCard
              {...exercises[current]}
              key={exercises[current].name}
              progress={seconds}
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <ExerciseCard
              {...exercises[++current]}
              key={exercises[++current].name}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

Index.getInitialProps = async function() {
  //const res = await fetch('https://api.')
  //const data = await res.json()
  const exe = await require('../public/data.json')
  const result = exe.reduce(
    (r, a) =>
      r.concat(
        { ...a, time: EXERCISE_TIME },
        { name: 'Rest', media: 'head-tilt', time: REST_TIME }
      ),
    [{ name: 'Prepare', time: PREPARE_TIME, media: 'head-tilt' }]
  )

  return {
    exercises: result.map(entry => entry),
  }
}

export default Index
