import { User } from 'src/app/user';
import { Destination } from './destination.model';
import { ToDo } from './toDo.model';

export interface Trip {
  id: number;
  title: string;
  details: string;
  startDate: Date;
  endDate: Date;
  destinations: Destination[];
  members: User[];
  toDo: ToDo[];
  imgURL: string;
}
