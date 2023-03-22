import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { catchError, mergeMap, Observable, of, Subscription } from 'rxjs';
import { b2cPolicies } from '../auth-config';
import { IdTokenClaims } from '../shared';
import { AuthService, User, UserService } from '../shared';

@Component({
  selector: 'app-msal-redirect',
  templateUrl: './msal-redirect.component.html',
  styleUrls: ['./msal-redirect.component.css'],
})
export class MsalRedirectComponent implements OnInit, OnDestroy {
  redirectSubscription!: Subscription;
  msg: string = '';

  constructor(
    private msal: MsalService,
    private auth: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.redirectSubscription = this.msal
      .handleRedirectObservable()
      .pipe(
        mergeMap((result): Observable<User | undefined> => {
          // validation
          if (!result) {
            return of(undefined);
          }

          // set user claims
          const idTokenClaims: IdTokenClaims =
            result.idTokenClaims as IdTokenClaims;

          // set user
          const user = {
            username: result?.account?.username as string,
            firstName: idTokenClaims.given_name,
            lastName: idTokenClaims.family_name,
            password: 'takeoutofimplementation', // changing DTOs and backend user implementation in future commit, password in frontend will cease to exist
          };

          // check what user flow policy was utilized
          // SignUp / Signin userflow:
          if (idTokenClaims.tfp === b2cPolicies.names.signUpSignIn) {
            // if user just signed up, provide welcome message
            if (idTokenClaims.newUser) {
              this.msg = `Welcome to Travel Track, ${user.firstName}! We're excited to help you track your journey.`;
              return this.userService.createUser(user);
            }
            // user logged in
            return of(user);
          }

          // Edit Profile userflow:
          if (idTokenClaims.tfp === b2cPolicies.names.editProfile) {
            return of(user);
          }

          return of(undefined);
        }),
        catchError((err) => of(err))
      )
      .subscribe((result: User | undefined | Error | HttpErrorResponse) => {
        if (!result) {
          return;
        }

        if (result instanceof Error || result instanceof HttpErrorResponse) {
          // unique error returned from user flow cancellation, will have a better implementation if I get into creating custom AD B2C policies
          if (result.message.includes('AADB2C90091')) {
            window.location.reload();
            return;
          }

          this.msg = `An error occurred. Please refresh and try again.`;
        }

        this.updateUserData(result as User);
        if (this.msg !== '') {
          window.confirm(this.msg);
          this.msg = '';
        }
      });
  }

  ngOnDestroy(): void {
    this.redirectSubscription.unsubscribe();
  }

  // update user data
  updateUserData(user: User): void {
    this.auth.setCurrentUser();
    this.auth.setLoginStatus(true);
  }
}
