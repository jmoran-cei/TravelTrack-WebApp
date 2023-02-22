import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { WebRequestService } from 'src/app/shared/services/web-request.service';
import { User } from '../../shared/models/user.model';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  // current user
  currentUserInit: User = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  };

  // logged in user object
  private currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(
    this.currentUserInit
  );
  currentUser$: Observable<User> = this.currentUser.asObservable();

  // login status
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();

  constructor(private router: Router, private userService: UserService, private webRequestService: WebRequestService) {}

  setCurrentUser(currentUser: User):void {
    this.currentUser.next(currentUser);
  }

  getCurrentUser(): User {
    return this.currentUser.value;
  }

  setLoginStatus(status: boolean):void {
    this.isLoggedIn.next(status);
  }

  // OLD METHOD - will be deleted soon --- avoiding temporary errors during current development
  loginUser(username: string, password: string): Observable<boolean> {
    return this.userService.getUser(username).pipe(
      take(1),
      map((result: User | undefined) => {
        if (result === undefined) {
          return false;
        } else {
          if (password === result.password) {
            // this.currentUser = result; // avoiding more errors temporarily
            this.isLoggedIn.next(!!this.currentUser);
            return true;
          }
          return false;
        }
      })
    );
  }


  // logout
  logoutUser() {
    this.webRequestService.setAccessToken('');
    this.setLoginStatus(false);
    this.setCurrentUser({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
    });
  }
}
