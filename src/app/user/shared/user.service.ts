import { Injectable } from "@angular/core";

@Injectable()
export class UserService {
  getUserByUsername(username:string) {
    return USERS.find(user => user.username == username)
  }
}

const USERS:any[] = [
  {
    username: 'jmoran@ceiamerica.com',
    password: 'P@ssw0rd',
    firstName: 'Jonathan',
    lastName: 'Moran',
    address: [],
    pictureURL: 'src/assets/images/dummy1.jpg'
  },
  {
    username: 'dummyuser@dummy.dum',
    password: 'P@ssw0rd',
    firstName: 'Dummy',
    lastName: 'User',
    address: [],
    pictureURL: 'assets/images/dummy1.jpg'
  }
]
