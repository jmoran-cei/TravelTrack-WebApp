import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { catchError, map, Observable, of, retry, take } from 'rxjs';
import { editProfileRequest } from 'src/app/auth-config';
import { WebRequestService } from 'src/app/shared/services/web-request.service';
import { environment } from 'src/environments/environment';
import { User } from '../../shared';

@Injectable()
export class UserService {
  usersUrl = environment.TravelTrackAPI + '/users/v1';

  constructor(
    private http: HttpClient,
    private webRequestService: WebRequestService,
    private msal: MsalService
  ) {}

  // have to grab users this way in order to get them from angular web api (can only get by 'id' not by a 'username')
  users = this.http
    .get<User[]>(this.usersUrl, this.webRequestService.headers)
    .pipe(
      retry(2),
      catchError(this.webRequestService.handleError('getUsers()', []))
    );

  // check if user is in users
  getUser(username: string): Observable<User | undefined> {
    const url = `${this.usersUrl}/${username.toLowerCase()}`;

    return this.http
      .get<User>(url, this.webRequestService.headers)
      .pipe(
        take(1),
        retry(2),
        catchError(this.webRequestService.handleError<User>('getUser()'))
      );
  }

  // create new user account
  createUser(user: User): Observable<User> {
    user.username = user.username.toLowerCase();

    return this.http
      .post<User>(this.usersUrl, user, this.webRequestService.headers)
      .pipe(
        catchError(this.webRequestService.handleError<User>('createUser()'))
      );
  }

  // update user account
  updateUser(user: User): Observable<User> {
    user.username = user.username.toLowerCase();

    return this.http
      .put<User>(
        `${this.usersUrl}/${user.username}`,
        user,
        this.webRequestService.headers
      )
      .pipe(
        catchError(this.webRequestService.handleError<User>('updateUser()'))
      );
  }

  // check if user exists
  checkUsernameExists(username: string): Observable<boolean> {
    var userValid = false;

    return this.getUser(username.toLowerCase()).pipe(
      map((result) => {
        if (result !== undefined) {
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
