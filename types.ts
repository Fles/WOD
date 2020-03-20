export interface Exercise {
  name: string;
  imageUrl: string;
}

export interface Base {
  name: string;
  exercises: Exercise[];
}
