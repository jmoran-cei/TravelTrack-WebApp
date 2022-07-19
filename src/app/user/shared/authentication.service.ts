import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { IUser } from "./user.model";

@Injectable()
export class AuthService {
  currentUser:IUser = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    address: [],
    pictureURL: ''
  }
  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  loginUser(username:string, password:string) {
    this.currentUser = {
      username: username,
      password: password,
      firstName: 'Testing',
      lastName: 'ThisOut',
      address: [],
      pictureURL: 'assets/images/users/dummy1.jpg'
    }
    this.isLoggedIn$.next(!!this.currentUser.username)
  }

  isAuthenticated() {
    return false
  }
}

