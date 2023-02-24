import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { BehaviorSubject, catchError, map, Observable, take } from 'rxjs';
import { loginRequest } from 'src/app/auth-config';
import { WebRequestService } from 'src/app/shared/services/web-request.service';
import { User } from '../../shared/models/user.model';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  storedUsername: string | null = localStorage.getItem('app.user.username');
  storedFirstName: string | null = localStorage.getItem('app.user.firstName');
  storedLastName: string | null = localStorage.getItem('app.user.lastName');
  // current user
  currentUserInit: User = {
    username: this.storedUsername ? this.storedUsername : '',
    password: '', // deleting and reimplementing when updating API
    firstName: this.storedFirstName ? this.storedFirstName : '',
    lastName: this.storedLastName ? this.storedLastName : '',
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

  constructor(
    private userService: UserService,
    private webRequestService: WebRequestService,
    private msal: MsalService
  ) {
    // if session data exists
    if (localStorage.getItem('app.isLoggedIn') === 'true') {
      this.setLoginStatus(true);
      // update angular variables for session
      if (this.updateAngularUserInfo()) {
      } else {
        this.sessionRestoreFailed();
      }
    } else {
      this.setLoginStatus(false);
    }
  }

  setCurrentUser(currentUser: User): void {
    this.currentUser.next(currentUser);
    // store current user
    localStorage.setItem('app.user.username', `${currentUser.username}`);
    localStorage.setItem('app.user.firstName', `${currentUser.firstName}`);
    localStorage.setItem('app.user.lastName', `${currentUser.lastName}`);
  }

  getCurrentUser(): User {
    return this.currentUser.value;
  }

  setLoginStatus(status: boolean): void {
    this.isLoggedIn.next(status);
    if (status === false) {
      localStorage.clear(); // clear session data
    } else {
      localStorage.setItem('app.isLoggedIn', 'true');
    }
  }

  // user re-opens tab / refreshes
  // update angular user object
  updateAngularUserInfo(): boolean {
    // update user object
    let username = localStorage.getItem('app.user.username');

    if (username) {
      this.userService.getUser(username).subscribe((user) => {
        if (!user) {
          this.sessionRestoreFailed();
          return;
        }
        this.setCurrentUser(user);
      });
      return true;
    }
    return false;
  }

  // something went wrong trying to get correct session data
  sessionRestoreFailed(): void {
    this.setLoginStatus(false);
    window.confirm(
      'We had to log you out because something went wrong. You must login to start a new session.'
    );
    this.login();
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

  // login redirect to Azure AD B2C page
  login(): void {
    this.msal
      .loginRedirect(loginRequest)
      .pipe(
        take(1),
        catchError(
          this.webRequestService.handleError<AuthenticationResult>(
            'loginPopup()'
          )
        )
      )
      .subscribe();
  }

  // logout
  logout(): void {
    this.logoutUser();
    this.msal.logout().subscribe();
  }

  // reset auth service props
  logoutUser(): void {
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
