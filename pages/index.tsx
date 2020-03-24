import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import ExerciseCard from '../ui/ExerciseCard'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeTraining } from '../tools/makeTraining'
import { Exercise } from '../types'

const Index = ({ exercises }) => {
  const [current, setCurrent] = useState(0)
  const [isActive, setIsActive] = useState(true)
  const [seconds, setSeconds] = useState(exercises[current].time)
  const next = current + 1
  const currentExercise: Exercise = exercises[current]
  const nextExercise: Exercise = exercises[next]

  const normalizeExerciseTime = value =>
    100 - ((value - 1) * 100) / (currentExercise.time - 1)

  const normalizeTrainingTime = current =>
    ((current - 0) * 100) / (exercises.length - 0)

  function toggle() {
    setIsActive(!isActive)
  }
  function reset(time) {
    setSeconds(time)
    setIsActive(false)
  }
  function startNext() {
    setSeconds(nextExercise.time)
    setCurrent(next)
  }

  React.useEffect(() => {
    let interval = null

    if (isActive) {
      interval = setInterval(() => {
        seconds >= 0 && setSeconds(seconds => seconds - 1)
      }, 1000)
    }
    if (seconds === 0 && nextExercise) startNext()

    return () => clearInterval(interval)
  }, [isActive, seconds])

  return (
    <div>
      <LinearProgress variant="buffer" value={normalizeTrainingTime(current)} />
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs={9}>
          <Paper>
            <ExerciseCard
              {...currentExercise}
              key={currentExercise.name}
              progress={seconds}
            />
            <LinearProgress
              variant="buffer"
              value={normalizeExerciseTime(seconds)}
            />
          </Paper>
        </Grid>
        {nextExercise ? (
          <Grid item xs={3}>
            <Paper>
              <ExerciseCard {...nextExercise} key={nextExercise.name} />
            </Paper>
          </Grid>
        ) : null}
      </Grid>
    </div>
  )
}

Index.getInitialProps = async function() {
  const exercises = await require('../public/exercises.json')
  return {
    exercises: makeTraining(exercises, 1, 2, 1),
  }
}

export default Index
