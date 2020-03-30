export const beep = (vol, freq, duration, context) => {
  const v = context.createOscillator()
  const u = context.createGain()
  v.connect(u)
  v.frequency.value = freq
  v.type = 'square'
  u.connect(context.destination)
  u.gain.value = vol * 0.01
  v.start(context.currentTime)
  v.stop(context.currentTime + duration * 0.001)
}
