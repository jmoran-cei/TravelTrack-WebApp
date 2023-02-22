import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Subscription, take } from 'rxjs';
import { IdTokenClaims } from '../shared';
import { WebRequestService } from '../shared/services/web-request.service';
import { AuthService, User, UserService } from '../user';

@Component({
  selector: 'app-msal-redirect',
  templateUrl: './msal-redirect.component.html',
  styleUrls: ['./msal-redirect.component.css'],
})
export class MsalRedirectComponent implements OnInit, OnDestroy {
  redirectSubscription!: Subscription;

  constructor(
    private msal: MsalService,
    private router: Router,
    private auth: AuthService,
    private userService: UserService,
    private webRequestService: WebRequestService
  ) {}

  ngOnInit(): void {
    this.redirectSubscription = this.msal
      .handleRedirectObservable()
      .subscribe((result) => {
        // ignore until auth result provided
        if (result === undefined || result === null) {
          return;
        }

        // set user claims
        const IdTokenClaims: IdTokenClaims =
          result.idTokenClaims as IdTokenClaims;

        // set user
        const user = {
          username: result?.account?.username as string,
          firstName: IdTokenClaims.given_name,
          lastName: IdTokenClaims.family_name,
          password: 'takeoutofimplementation', // changing DTOs and backend user implementation in future commit, password in frontend will cease to exist
        };

        // if new user, add them to the backend
        if (IdTokenClaims.newUser) {
          this.userService
            .createUser(user)
            .pipe(take(1))
            .subscribe((user) =>
              // welcome user to app
              window.alert(
                `Welcome to Travel Track, ${user.firstName}! We're excited to help you track your journey.`
              )
            );
        }

        this.userLoggedIn(user);
      });
  }

  ngOnDestroy(): void {
    this.redirectSubscription.unsubscribe();
  }

  userLoggedIn(user: User) {
    this.auth.setCurrentUser(user);
    this.auth.setLoginStatus(true);
    this.webRequestService.updateAccessToken();
    this.router.navigateByUrl('/trips');
  }
}
