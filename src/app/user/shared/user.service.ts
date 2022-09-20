import { Injectable } from "@angular/core";
import { User } from "../../shared/models/user.model";

@Injectable()
export class UserService {
  getUserByUsername(username:string):User {
    return USERS.find((user:User) => user.username == username)!
  }
}

const USERS:User[] = [
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
