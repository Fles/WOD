export const addTimeToExercises = (exercises, time) =>
  exercises.map(exercise => ({ ...exercise, time }))

export const addPrepare = (exercises, time) => {
  exercises.unshift({
    name: 'Prepare',
    type: 'prepare',
    time: time,
    difficulty: 'easy',
    media: 'head-tilt',
  })
  return exercises
}

export const addRestAfterRach = (exercises, time) =>
  exercises.reduce(
    (_, exercise) =>
      _.concat(exercise, {
        name: 'Rest',
        type: 'rest',
        difficulty: '',
        time: time,
        media: 'head-tilt',
      }),
    []
  )

export const makeTraining = (
  exercises,
  prepare_time,
  exercise_time,
  rest_time
) =>
  addPrepare(
    addRestAfterRach(addTimeToExercises(exercises, exercise_time), rest_time),
    prepare_time
  )
