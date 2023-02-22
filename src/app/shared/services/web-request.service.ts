import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalBroadcastService } from '@azure/msal-angular';
import {
  AuthenticationResult,
  EventMessage,
  EventType,
} from '@azure/msal-browser';
import {
  BehaviorSubject,
  filter,
  Observable,
  of,
  take,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  apiKey = environment.TravelTrackAPIKey;

  // Travel Track API Headers
  headers = {
    headers: new HttpHeaders({
      'X-Api-Version': '2.0',
      'X-Api-Key': this.apiKey,
      Authorization: 'Token Not Added',
    }),
  };

  // Travel Track API access token
  private travelTrackAPIAccessToken: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  travelTrackAPIAccessToken$: Observable<string> =
    this.travelTrackAPIAccessToken.asObservable();

  getAccessToken(): string {
    return this.travelTrackAPIAccessToken.value;
  }

  setAccessToken(token: string): void {
    this.travelTrackAPIAccessToken.next(token);
  }

  updateAccessToken(): void {
    this.aquireAccessToken().subscribe((result: EventMessage) => {
      let payload = result?.payload as AuthenticationResult;
      let token = payload.accessToken;
      this.setAccessToken(token);
    });
  }

  constructor(private broadcastService: MsalBroadcastService) {}

  aquireAccessToken(): Observable<EventMessage> {
    return this.broadcastService.msalSubject$.pipe(
      filter(
        (msg: EventMessage) => msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
      ),
      take(1)
    );
  }

  // updateAccessToken()
  updateAuthorizationHeader(token: string): void {
    if (token !== undefined) {
      this.setAuthorizationHeader(`Bearer ${token}`);
    } else {
      this.setAuthorizationHeader("Token Couldn't Be Added");
    }
  }

  setAuthorizationHeader(value: string): void {
    this.headers.headers = this.headers.headers.set(
      'Authorization',
      `${value}`
    );
  }

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
