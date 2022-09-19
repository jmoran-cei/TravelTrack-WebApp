import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  map,
  Observable,
  of,
  retry,
  shareReplay,
  take,
  tap,
} from 'rxjs';
import { IUser } from '.';

@Injectable()
export class UserService {
  usersUrl = '/api/users';

  constructor(private http: HttpClient) {}

  // have to grab users this way in order to get them from angular web api(can only get by 'id' not by a 'username')
  users = this.http
    .get<IUser[]>(this.usersUrl)
    .pipe(retry(2), catchError(this.handleError('getUsers()', [])));

  // check if user is in users
  getUser(username: string): Observable<IUser | undefined> {
    return this.users.pipe(
      take(1),
      map((users: IUser[]) => {
        return users.find((user) => user.username === username);
      })
    );
  }

  // create new user account
  createUser(user: IUser): Observable<IUser> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<IUser>(this.usersUrl, user, { headers: headers })
      .pipe(
        tap((data: IUser) => console.table(data)),
        catchError(this.handleError<IUser>('createUser()'))
      );
  }

  // check if user exists
  checkUsernameExists(username: string): Observable<boolean> {
    var userValid = false;

    return this.getUser(username).pipe(
      map((result) => {
        if (result !== undefined) {
          return (userValid = true);
        } else {
          return (userValid = false);
        }
      })
    );
  }

  private handleError<IUser>(
    operation = 'operation',
    result?: IUser
  ): (error: any) => Observable<IUser> {
    return (error: any): Observable<IUser> => {
      console.error('error: ', error.status);
      return of(result as IUser);
    };
  }
}
