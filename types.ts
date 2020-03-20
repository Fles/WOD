export interface Exercise {
  name: string;
}

export interface Base {
  name: string;
  exercises: [Exercise, Exercise, Exercise];
}
