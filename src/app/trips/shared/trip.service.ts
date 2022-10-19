import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry, tap } from 'rxjs';
import { secrets } from 'src/app/secrets';
import { AuthService, User } from 'src/app/user/shared';
import { Trip } from '../../shared/models/trip.model';

@Injectable()
export class TripService {
  // tripsUrl = '/api/trips'; // temporary: angular in-mem web api
  tripsUrl = 'https://localhost:7194/api/trips';
  apiKey = secrets.TravelTrackAPIKey;
  // apiKey = 'test'; // uncomment if testing on different machine

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Api-Version': '1.0',
      'X-Api-Key': this.apiKey
    }),
  };

  constructor(private http: HttpClient, private auth: AuthService) {}

  // get all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl, this.headers).pipe(
      map((trips) =>
        this.filterTripsByUsername(trips, this.auth.currentUser.username)
      ),
      retry(2),
      catchError(this.handleError<Trip[]>('getTrips()', []))
    );
  }

  filterTripsByUsername(trips: Trip[], username: string): Trip[] {
    const filteredTrips = trips.filter((trip: Trip) => {
      return (trip.members || []).some(
        (member: User) => member.username === username
      );
    });

    return filteredTrips;
  }

  // get a specific trip
  getTrip(id: number): Observable<Trip> {
    const url = `${this.tripsUrl}/${id}`;

    return this.http
      .get<Trip>(url, this.headers)
      .pipe(retry(2), catchError(this.handleError<Trip>('getTrip()')));
  }

  // create new trip
  createTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.tripsUrl, trip, this.headers).pipe(
      tap((data: Trip) => console.table(data)),
      catchError(this.handleError<Trip>('createTrip()'))
    );
  }

  // save an edited trip
  updateTrip(trip: Trip): Observable<Trip> {
    return this.http
      .put<Trip>(`${this.tripsUrl}/${trip.id}`, trip, this.headers)
      .pipe(
        tap((data: Trip) => console.table(data)),
        catchError(this.handleError<Trip>('createTrip()'))
      );
  }

  // delete an existing trip
  deleteTrip(id: number): Observable<Trip> {
    const url = `${this.tripsUrl}/${id}`;

    return this.http.delete<Trip>(url, this.headers).pipe(
      tap((data: Trip) => console.table(data)),
      catchError(this.handleError<Trip>('createTrip()'))
    );
  }

  sortByTitle(trips: Trip[]): Trip[] {
    // console.log("Trips sorted alphabetically by title");
    return (trips = trips.sort((a: Trip, b: Trip) =>
      a.title.localeCompare(b.title)
    ));
  }

  sortByEarliestDate(trips: Trip[]): Trip[] {
    // default for PREVIOUS dates
    // console.log("Trips sorted by earliest date");

    // sorting by EARLIEST DATE: sorts dates oldest-newest
    return (trips = trips.sort(
      (a: Trip, b: Trip) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    ));
  }

  sortByLatestDate(trips: Trip[]): Trip[] {
    // default for UPCOMING dates
    // console.log("Trips sorted by latest date");

    // sorting by LATEST DATE: sorts dates newest-oldest
    return (trips = trips.sort(
      (a: Trip, b: Trip) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    ));
  }

  // function for handling errors
  private handleError<Trip>(
    operation = 'operation',
    result?: Trip
  ): (error: any) => Observable<Trip> {
    return (error: any): Observable<Trip> => {
      console.error(error);
      return of(result as Trip);
    };
  }
}
