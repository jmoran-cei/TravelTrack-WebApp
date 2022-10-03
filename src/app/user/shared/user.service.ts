import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry, take, tap } from 'rxjs';
import { User } from '.';

@Injectable()
export class UserService {
  // usersUrl = '/api/users'; // temporary: angular in-mem web api
  usersUrl = 'https://localhost:7194/api/users';

  constructor(private http: HttpClient) {}

  // have to grab users this way in order to get them from angular web api (can only get by 'id' not by a 'username')
  users = this.http
    .get<User[]>(this.usersUrl)
    .pipe(retry(2), catchError(this.handleError('getUsers()', [])));

  // check if user is in users
  getUser(username: string): Observable<User | undefined> {
    return this.users.pipe(
      take(1),
      map((users: User[]) => {
        return users.find((user) => user.username === username);
      })
    );
  }

  // create new user account
  createUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<User>(this.usersUrl, user, { headers: headers }).pipe(
      tap((data: User) => console.table(data)),
      catchError(this.handleError<User>('createUser()'))
    );
  }

  // update user account
  updateUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .put<User>(`${this.usersUrl}/${user.username}`, user, {
        headers: headers,
      })
      .pipe(
        tap((data: User) => console.table(data)),
        catchError(this.handleError<User>('updateUser()'))
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

  private handleError<User>(
    operation = 'operation',
    result?: User
  ): (error: any) => Observable<User> {
    return (error: any): Observable<User> => {
      console.error('error: ', error.status);
      return of(result as User);
    };
  }
}
