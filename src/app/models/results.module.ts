import { LocationDate } from "./location.moule";
import { Origin } from "./origin.module";

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
  origin: Origin,
  location: LocationDate
}
