import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry, take, tap } from 'rxjs';
import { secrets } from 'src/app/secrets';
import { User } from '.';

@Injectable()
export class UserService {
  // usersUrl = '/api/users'; // temporary: angular in-mem web api
  usersUrl = 'https://localhost:7194/api/users';
  apiKey = secrets.TravelTrackAPIKey;
  // apiKey = 'test'; // uncomment if testing on different machine

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Api-Version': '1.0',
      'X-Api-Key': this.apiKey
    }),
  };

  constructor(private http: HttpClient) {}

  // have to grab users this way in order to get them from angular web api (can only get by 'id' not by a 'username')
  users = this.http
    .get<User[]>(this.usersUrl, this.headers)
    .pipe(retry(2), catchError(this.handleError('getUsers()', [])));

  // check if user is in users
  getUser(username: string): Observable<User | undefined> {
    const url = `${this.usersUrl}/${username.toLowerCase()}`;

    return this.http
      .get<User>(url, this.headers)
      .pipe(take(1), retry(2), catchError(this.handleError<User>('getUser()')));
  }

  // create new user account
  createUser(user: User): Observable<User> {
    user.username = user.username.toLowerCase();

    return this.http.post<User>(this.usersUrl, user, this.headers).pipe(
      catchError(this.handleError<User>('createUser()'))
      );
  }

  // update user account
  updateUser(user: User): Observable<User> {
    user.username = user.username.toLowerCase();

    return this.http
      .put<User>(`${this.usersUrl}/${user.username}`, user, this.headers)
      .pipe(
        catchError(this.handleError<User>('updateUser()'))
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

  private handleError<User>(
    operation = 'operation',
    result?: User
  ): (error: any) => Observable<User> {
    return (error: any): Observable<User> => {
      return of(result as User);
    };
  }
}
