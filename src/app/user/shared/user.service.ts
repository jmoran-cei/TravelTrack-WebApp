import { Injectable } from "@angular/core";
import { IUser } from "../../shared/models/user.model";

@Injectable()
export class UserService {
  getUserByUsername(username:string):IUser {
    return USERS.find((user:IUser) => user.username == username)!
  }
}

const USERS:IUser[] = [
  {
    username: 'jmoran@ceiamerica.com',
    password: 'P@ssw0rd',
    firstName: 'Jonathan',
    lastName: 'Moran',
    address: [],
    pictureURL: 'assets/images/dummy1.jpg'
  },
  {
    username: 'dummyuser@dummy.dum',
    password: 'P@ssw0rd',
    firstName: 'Dummy',
    lastName: 'User',
    address: [],
    pictureURL: 'assets/images/users/dummy1.jpg'
  }
]
