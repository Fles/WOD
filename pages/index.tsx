import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import ExerciseCard from '../ui/ExerciseCard'
import { makeTraining } from '../tools/makeTraining'

const Index = ({ exercises }) => {
  const [current, setCurrent] = useState(0)
  const [isActive, setIsActive] = useState(true)
  const [seconds, setSeconds] = useState(exercises[current].time)
  const next = current + 1
  const currentExercise = exercises[current]
  const nextExercise = exercises[next]

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
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs={9}>
          <Paper>
            <ExerciseCard
              {...currentExercise}
              key={currentExercise.name}
              progress={seconds}
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <ExerciseCard {...nextExercise} key={nextExercise.name} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

Index.getInitialProps = async function() {
  const exercises = await require('../public/exercises.json')
  const result = makeTraining(exercises, 1, 1, 1)
  return {
    exercises: result.map(entry => entry),
  }
}

export default Index
