import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
// import Slide from "react-swipeable-views";
import Button from '@material-ui/core/Button'
import { makeTraining } from '../tools/makeTraining'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { red, blue, green } from '@material-ui/core/colors'
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'
import WodContext from '../components/WodContext'
import { Exercise } from '../types'
import { beep } from '../tools/beep'
import { CardMedia } from '@material-ui/core'

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

  const matches = useMediaQuery('(max-width:1800px)')
  return (
    <div>
      <AutoRotatingCarousel
        label={null}
        open={true}
        onClose={() => {}}
        onStart={() => {}}
        autoplay={true}
        mobile={matches}
      >
        {training.map(({ name, media, instructions }) => {
          return (
            <Slide
              key={name}
              media={
                <CardMedia
                  component="video"
                  image={`/images/${media}.mp4`}
                  title={name}
                  autoPlay={true}
                  loop={true}
                />
              }
              mediaBackgroundStyle={{ backgroundColor: '#fff' }}
              style={{ backgroundColor: '#aaa' }}
              title={name}
              subtitle={null}
            />
          )
        })}
      </AutoRotatingCarousel>
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
