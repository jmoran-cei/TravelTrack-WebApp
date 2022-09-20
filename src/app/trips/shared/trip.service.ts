import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, tap } from 'rxjs';
import { Destination } from '../../shared/models/destination.model';
import { Trip } from '../../shared/models/trip.model';

@Injectable()
export class TripService {
  tripsUrl = '/api/trips';

  constructor(private http: HttpClient) {}

  // get all trips
  getTrips(): Observable<Trip[]> {
    return this.http
      .get<Trip[]>(this.tripsUrl)
      .pipe(
        retry(2),
        catchError(this.handleError<Trip[]>('getTrips()', [])
      ));
  }

  // get a specific trip
  getTrip(id: number): Observable<Trip> {
    const url = `${this.tripsUrl}/${id}`;

    return this.http
      .get<Trip>(url)
      .pipe(
        retry(2),
        catchError(this.handleError<Trip>('getTrip()')
      ));
  }

  // create new trip
  createTrip(trip: Trip): Observable<Trip> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<Trip>(this.tripsUrl, trip, { headers: headers })
      .pipe(
        tap((data: Trip) => console.table(data)),
        catchError(this.handleError<Trip>('createTrip()'))
      );
  }

  // save an edited trip
  updateTrip(trip: Trip): Observable<Trip> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .put<Trip>(this.tripsUrl, trip, { headers: headers })
      .pipe(
        tap((data: Trip) => console.table(data)),
        catchError(this.handleError<Trip>('createTrip()'))
      );
  }

  // delete an existing trip
  deleteTrip(id: number): Observable<Trip> {
    const url = `${this.tripsUrl}/${id}`;

    return this.http
      .delete<Trip>(url)
      .pipe(
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

  // returns boolean based on whether a trip has multiple destinations or not
  hasMultipleDestinations(destinations: Destination[]): boolean {
    if (destinations.length > 1) {
      return true;
    }
    return false;
  }

  // function for handling errors
  private handleError<ITrip>(operation = 'operation', result?: ITrip): (error: any) => Observable<ITrip> {
    return (error: any): Observable<ITrip> => {
      console.error(error);
      return of(result as ITrip);
    };
  }
}
