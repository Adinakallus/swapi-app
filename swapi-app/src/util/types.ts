type Gender = "male" | "female" | "n/a";

export interface Person {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: Gender;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface SWAPIResult<T> {
  count: number;
  next: string;
  previous: string;
  results: T[] | null;
}
