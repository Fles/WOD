import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import ExerciseCard from '../components/ExerciseCard'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeTraining } from '../tools/makeTraining'
import { Exercise } from '../types'
import { useContext } from 'react'
import WodContext from '../components/WodContext'
import { beep } from '../tools/beep'

const Start = props => {
  const { sequence } = useContext(WodContext)

  const PREP_TIME = 10
  const EXEC_TIME = 45
  const REST_TIME = 15

  const sortedExercises = sequence.map(id =>
    props.exercises.find(exe => id === exe.id)
  )

  const training = makeTraining(
    sortedExercises,
    PREP_TIME,
    EXEC_TIME,
    REST_TIME
  )

  const [isActive, setIsActive] = useState(true)
  const [current, setCurrent] = useState(0)

  const currentExercise: Exercise = training[current]
  const nextExercise: Exercise = training[current + 1]
  const nextNextExercise: Exercise = training[current + 2]

  const [seconds, setSeconds] = useState(currentExercise.time)

  const normalizeTrainingTime = current =>
    ((current - 0) * 100) / (training.length - 0)
  const normalizeExerciseTime = value =>
    100 - ((value - 1) * 100) / (currentExercise.time - 1)

  function toggle() {
    setIsActive(!isActive)
  }
  function reset(time) {
    setSeconds(time)
    setIsActive(false)
  }
  function startNext() {
    setSeconds(nextExercise.time)
    setCurrent(current + 1)
  }

  React.useEffect(() => {
    const audioCtx = new AudioContext()

    if (seconds === 2 || seconds === 1) {
      beep(50, 700, 10, audioCtx)
    }

    if (seconds === 0) {
      beep(80, 1000, 40, audioCtx)
    }

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
      <LinearProgress
        variant="determinate"
        value={normalizeTrainingTime(current)}
      />
      <Grid container justify="space-around" alignItems="center">
        <Grid item xs={8}>
          <Paper>
            <ExerciseCard
              {...currentExercise}
              key={currentExercise.name}
              progress={seconds}
            />
            <LinearProgress
              variant="determinate"
              value={normalizeExerciseTime(seconds)}
            />
          </Paper>
        </Grid>
        {nextExercise ? (
          <Grid item xs={nextExercise.name === 'Rest' ? 1 : 2}>
            <Paper>
              <ExerciseCard {...nextExercise} key={nextExercise.name} />
            </Paper>
          </Grid>
        ) : null}
        {nextNextExercise ? (
          <Grid item xs={nextNextExercise.name === 'Rest' ? 1 : 2}>
            <Paper>
              <ExerciseCard {...nextNextExercise} key={nextNextExercise.name} />
            </Paper>
          </Grid>
        ) : null}
      </Grid>
    </div>
  )
}

Start.getInitialProps = async function(c) {
  const exercises = await require('../public/exercises.json')

  return {
    exercises,
  }
}

export default Start
