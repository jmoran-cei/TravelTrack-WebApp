import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  apiKey = environment.TravelTrackAPIKey;

  // Travel Track API Headers
  headers = {
    headers: new HttpHeaders({
      'X-Api-Key': this.apiKey,
    }),
  };

  constructor() {}

  // function for handling errors
  public handleError<T>(
    operation = 'operation',
    result?: T
  ): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error);

      if (error instanceof (HttpErrorResponse || Error)) {
        return throwError(() => error);
      }
      return of(result as T);
    };
  }
}
