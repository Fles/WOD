import { createContext } from 'react'

const WodContext = createContext({
  sequence: [],
  add: _ => _,
  remove: _ => _,
  clear: _ => _,
  find: _ => _,
  shuffle: _ => _,
})

export default WodContext
