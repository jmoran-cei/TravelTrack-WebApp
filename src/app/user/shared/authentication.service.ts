import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { IUser } from "../../shared/models/user.model";

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
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();


  constructor(private router:Router) {}


  loginUser(username:string, password:string) {
    this.currentUser = {
      username: username,
      password: password,
      firstName: 'Testing',
      lastName: 'ThisOut',
      address: [],
      pictureURL: 'assets/images/users/dummy1.jpg'
    }
    this.isLoggedIn.next(!!this.currentUser);
  }

  logoutUser() {
    this.isLoggedIn.next(false);
    this.router.navigate(['/user/login']);
  }
}

