import { User } from "src/app/user"
import { Destination } from "./destination.model"
import { ToDo } from "./toDo.model"

export interface Trip {
  id: number
  title: string
  details: string
  startDate: Date
  endDate: Date
  destinations: Destination[]
  //temporarily type never[]
  members: User[]
  photos: never[]   //update
  itinerary: never[]  //update
  toDo: ToDo[]
  imgUrl: string
}
