import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, map, Observable, take } from "rxjs";
import { User } from "../../shared/models/user.model";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
  currentUser:User = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    address: [],
    pictureURL: '',
  };
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();

  constructor(private router: Router, private userService: UserService) {}

  loginUser(username: string, password: string): Observable<boolean> {
    return this.userService.getUser(username).pipe(
      take(1),
      map((result: User | undefined) => {
        if (result === undefined) {
          console.log(`Could not find a user with username: '${username}'.`);
          return false;
        } else {
          if (password === result.password) {
            console.log('Correct Login!');
            this.currentUser = result;
            this.isLoggedIn.next(!!this.currentUser);
            return true;
          }
          console.log(`Incorrect password for ${username}`)
          return false;
        }
      })
    );
  }

  logoutUser() {
    this.isLoggedIn.next(false);
    this.router.navigate(['/user/login']);
  }
}
