import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { catchError, map, Observable, of, retry, take } from 'rxjs';
import { editProfileRequest } from 'src/app/auth-config';
import { WebRequestService } from 'src/app/shared/services/web-request.service';
import { environment } from 'src/environments/environment';
import { User } from '../../shared';
import { MinimalUser } from '../models/minimalUser.model';

@Injectable()
export class UserService {
  usersUrl = environment.TravelTrackAPI + '/users';

  constructor(
    private http: HttpClient,
    private webRequestService: WebRequestService,
    private msal: MsalService
  ) {}

  users = this.http
    .get<MinimalUser[]>(this.usersUrl, this.webRequestService.headers)
    .pipe(
      retry(2),
      catchError(this.webRequestService.handleError('getUsers()', []))
    );

  // check if user is in users
  getUser(username: string): Observable<User | undefined> {
    const url = `${this.usersUrl}/${username.toLowerCase()}`;

    if (username === "") {
      return of(undefined);
    }

    return this.http.get<User>(url, this.webRequestService.headers).pipe(
      take(1),
      catchError((err) => {
          this.webRequestService.handleError<User>('getUser()', err);
          return of(undefined);
      })
    );
  }

  // check if user exists
  checkUsernameExists(username: string): Observable<boolean> {
    var userValid = false;

    return this.getUser(username.toLowerCase()).pipe(
      map((result) => {
        console.log('response: ', result);
        if (result !== undefined) {
          console.log(true);
          return (userValid = true);
        } else {
          return (userValid = false);
        }
      })
    );
  }

  editProfile(): void {
    this.msal
      .loginRedirect(editProfileRequest)
      .pipe(
        take(1),
        catchError(
          this.webRequestService.handleError<AuthenticationResult>(
            'editProfile()'
          )
        )
      )
      .subscribe();
  }
}
