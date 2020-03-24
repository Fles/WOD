export interface Exercise {
  name: s
  type: 'exercise' | 'rest' | 'prepare'
  difficulty: 'hard' | 'medium' | 'easy'
  target: string[]
  instructions: string
  media: string
  time: number
  progress: number
}
