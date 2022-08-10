import { IUser } from "src/app/user"
import { IDestination } from "./destination.model"

export interface ITrip {
  id: number
  title: string
  details: string
  startDate: Date
  endDate: Date
  destinations: IDestination[]
  //temporarily type never[]
  members: IUser[]
  photos: never[]   //update
  itinerary: never[]  //update
  toDo: never[]       //update
  imgUrl: string
}
