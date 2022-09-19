import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, take } from "rxjs";
import { IUser } from "../../shared/models/user.model";
import { UserService } from "./user.service";

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

  constructor(private router:Router, private userService: UserService) {}

  loginUser(username:string, password:string): boolean {
    var validLogin = false;

    this.userService.getUser(username).pipe(take(1)).subscribe(
      result => {
        if (result === undefined) {
          console.log(`Could not find a user with username: '${username}'.`);
        }
        else {
          if (password === result.password) {
            console.log("Correct Login!");
            this.currentUser = result;
            validLogin = true;
          }
        }
      }
    )

    this.isLoggedIn.next(!!this.currentUser);
    return validLogin;
  }

  logoutUser() {
    this.isLoggedIn.next(false);
    this.router.navigate(['/user/login']);
  }
}

