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

  constructor(private userService: UserService, private webRequestService: WebRequestService, private msal: MsalService) {}

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


  // login redirect to Azure AD B2C page
  login() {
    this.msal
      .loginRedirect(loginRequest)
      .pipe(
        catchError(
          this.webRequestService.handleError<AuthenticationResult>(
            'loginPopup()'
          )
        ),
        take(1)
      )
      .subscribe();
  }

  // logout
  logout() {
    this.msal.logout().subscribe(() => {
      this.logoutUser();
    });
  }

  // reset auth service props
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
