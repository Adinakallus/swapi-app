import type { Person, SWAPIResult } from "../util/types";

const BASE_URL: string = "https://swapi.py4e.com/api";

export const getPeople = (page: number = 1): string => {
  return `${BASE_URL}/people/?page=${page}`;
};

export const getPersonDetails = (id: number): string => {
  return `${BASE_URL}/people/${id}`;
};

export const getAllPeople = async (): Promise<Person[]> => {
  let allPeople: Person[] = [];
  let nextUrl: string | null = `${BASE_URL}/people/?page=1`;

  while (nextUrl) {
    const response = await fetch(nextUrl);
    const data: SWAPIResult<Person> = await response.json();
    if (data.results) {
      allPeople = [...allPeople, ...data.results];
    }
    nextUrl = data.next;
  }

  return allPeople;
};
