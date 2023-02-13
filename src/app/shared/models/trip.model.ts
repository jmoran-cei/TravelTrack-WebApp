import { Destination, ToDo, TripPhoto, User } from '..';

export interface Trip {
  id: number;
  title: string;
  details: string;
  startDate: Date;
  endDate: Date;
  destinations: Destination[];
  members: User[];
  toDo: ToDo[];
  photos: TripPhoto[];
  imgURL: string;
}
