import { LocationDate } from "./location.moule";

export interface Results{
  id: number,
  name: string;
  created: Date,
  episode: string[],
  gender: string,
  image: string,
  species: string,
  status: string,
  type: string,
  url: string,
  location: LocationDate
}
