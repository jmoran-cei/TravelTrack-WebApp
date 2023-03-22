import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo, AuthenticationResult } from '@azure/msal-browser';
import { BehaviorSubject, catchError, map, Observable, take } from 'rxjs';
import { loginRequest } from 'src/app/auth-config';
import { WebRequestService } from 'src/app/shared/services/web-request.service';
import { User } from '../../shared/models/user.model';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  // initialize user
  currentUserInit: User = this.getUserData();

  // logged-in user object
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
    // if user has an account logged-in in the cache
    if (this.msal.instance.getAllAccounts().length > 0) {
      this.setLoginStatus(true);
    } else {
      this.setLoginStatus(false);
    }
  }

  setCurrentUser(): void {
    this.currentUser.next(this.getUserData());
  }

  getCurrentUser(): User {
    return this.currentUser.value;
  }

  getIdTokenClaims(accountInfo: AccountInfo) {
    return accountInfo.idTokenClaims!;
  }

  // gets cached User data if it exists
  // always has updated user data
  getUserData(): User {
    // check cache for local account(s)
    let localAccounts: AccountInfo[] = this.msal.instance.getAllAccounts();
    if (!localAccounts || localAccounts.length < 1) {
      return {
        username: '',
        firstName: '',
        lastName: '',
        password: '',
      } as User;
    }

    // sort to have most recently updated cached account version
    localAccounts.sort((a: AccountInfo, b: AccountInfo) => {
      let aClaims = this.getIdTokenClaims(a);
      let bClaims = this.getIdTokenClaims(b);

      return bClaims.auth_time! - aClaims.auth_time!;
    });

    let userInfo = localAccounts[0].idTokenClaims;

    return {
      username: userInfo?.emails![0],
      firstName: (userInfo as any).given_name,
      lastName: (userInfo as any).family_name,
      password: 'implementation changed in upcoming commit', // changing frontend model
    } as User;
  }

  setLoginStatus(status: boolean): void {
    this.isLoggedIn.next(status);
    if (status === false) {
      localStorage.clear(); // clear session data
    } else {
      localStorage.setItem('app.isLoggedIn', 'true');
    }
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
          this.webRequestService.handleError<AuthenticationResult>('login()')
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
    this.setLoginStatus(false);
    this.setCurrentUser();
  }
}
