export interface Exercise {
  name: string;
  target: Target | Target[];
}

export type Target = "chest" | "legs" | "arms" | "abs" | "back" | "cardio";
