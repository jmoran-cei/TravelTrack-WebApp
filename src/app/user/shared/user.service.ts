import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { IUser } from "../../shared/models/user.model";

@Injectable()
export class UserService {
  getUserByUsername(username:string):IUser {
    return USERS.find((user:IUser) => user.username === username)!
  }

  // my next PR will have CRUD using in-mem api for user service and implementation will differ
  // I saved user related work for last to be more efficient with manually testing, etc. while implementing other features
  checkUsernameExists(username: string): Observable<boolean> {
    return of(this.getUserByUsername(username) !== undefined).pipe(
      delay(500)
    );
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
  },
  {
    username: 'fakeuser@fakey.fake',
    password: 'P@ssw0rd',
    firstName: 'Fake',
    lastName: 'User',
    address: [],
    pictureURL: 'assets/images/users/dummy1.jpg'
  }
]
