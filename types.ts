export interface Exercise {
  name: string;
  level: "A" | "B" | "C";
}

export interface ExerciseGroup {
  name: string;
  exercises: Exercise[];
}
