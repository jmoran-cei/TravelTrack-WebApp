import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry, take, tap } from 'rxjs';
import { WebRequestService } from 'src/app/shared/services/web-request.service';
import { environment } from 'src/environments/environment';
import { User } from '.';

@Injectable()
export class UserService {
  usersUrl = environment.TravelTrackAPI + '/users';

  constructor(private http: HttpClient, private webRequestService: WebRequestService) {}

  // have to grab users this way in order to get them from angular web api (can only get by 'id' not by a 'username')
  users = this.http
    .get<User[]>(this.usersUrl, this.webRequestService.headers)
    .pipe(retry(2), catchError(this.webRequestService.handleError('getUsers()', [])));

  // check if user is in users
  getUser(username: string): Observable<User | undefined> {
    const url = `${this.usersUrl}/${username.toLowerCase()}`;

    return this.http
      .get<User>(url, this.webRequestService.headers)
      .pipe(take(1), retry(2), catchError(this.webRequestService.handleError<User>('getUser()')), tap((v)=> {console.log(v)}));
  }

  // create new user account
  createUser(user: User): Observable<User> {
    user.username = user.username.toLowerCase();

    return this.http.post<User>(this.usersUrl, user, this.webRequestService.headers).pipe(
      catchError(this.webRequestService.handleError<User>('createUser()'))
      );
  }

  // update user account
  updateUser(user: User): Observable<User> {
    user.username = user.username.toLowerCase();

    return this.http
      .put<User>(`${this.usersUrl}/${user.username}`, user, this.webRequestService.headers)
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
}
