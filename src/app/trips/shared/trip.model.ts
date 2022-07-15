import { ILocation } from "./location.model"

export interface ITrip {
  id: number
  title: string
  startDate: Date
  endDate: Date
  locations: ILocation[]
  multipleLocations: boolean // is set OnInit by multipleLocations() method
  //temporarily type never[]
  members: never[]    //update
  pictures: never[]   //update
  itinerary: never[]  //update
  toDo: never[]       //update
  imgUrl: string
}
