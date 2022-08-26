import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, tap } from 'rxjs';
import { IDestination } from '../../shared/models/destination.model';
import { ITrip } from '../../shared/models/trip.model';

@Injectable()
export class TripService {
  tripsUrl = '/api/trips';

  constructor(private http: HttpClient) {}

  // get all trips
  getTrips(): Observable<ITrip[]> {
    return this.http
      .get<ITrip[]>(this.tripsUrl)
      .pipe(
        retry(2),
        catchError(this.handleError<ITrip[]>('getTrips()', [])
      ));
  }

  // get a specific trip
  getTrip(id: number): Observable<ITrip> {
    const url = `${this.tripsUrl}/${id}`;

    return this.http
      .get<ITrip>(url)
      .pipe(
        retry(2),
        catchError(this.handleError<ITrip>('getTrip()')
      ));
  }

  // create new trip
  createTrip(trip: ITrip) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<ITrip>(this.tripsUrl, trip, { headers: headers })
      .pipe(
        tap((data: any) => console.table(data)),
        catchError(this.handleError('createTrip()'))
      );
  }

  // save an edited trip
  updateTrip(trip: ITrip) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .put<ITrip>(this.tripsUrl, trip, { headers: headers })
      .pipe(
        tap((data: any) => console.table(data)),
        catchError(this.handleError('createTrip()'))
      );
  }

  // delete an existing trip
  deleteTrip(id: number) {
    const url = `${this.tripsUrl}/${id}`;

    return this.http
      .delete(url)
      .pipe(
        tap((data:any) => console.table(data)),
        catchError(this.handleError('createTrip()'))
      );
  }

  // delete an existing trip
  deleteTrip(id: number) {
    const url = `${this.tripsUrl}/${id}`;

    return this.http
      .delete(url)
      .pipe(
        tap((data: any) => console.table(data)),
        catchError(this.handleError('createTrip()'))
    );
  }

  sortByTitle(trips: ITrip[]) {
    // console.log("Trips sorted alphabetically by title");
    return (trips = trips.sort((a: ITrip, b: ITrip) =>
      a.title.localeCompare(b.title)
    ));
  }

  sortByEarliestDate(trips: ITrip[]) {
    // default for PREVIOUS dates
    // console.log("Trips sorted by earliest date");

    // sorting by EARLIEST DATE: sorts dates oldest-newest
    return (trips = trips.sort(
      (a: ITrip, b: ITrip) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    ));
  }

  sortByLatestDate(trips: ITrip[]) {
    // default for UPCOMING dates
    // console.log("Trips sorted by latest date");

    // sorting by LATEST DATE: sorts dates newest-oldest
    return (trips = trips.sort(
      (a: ITrip, b: ITrip) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    ));
  }

  // returns boolean based on whether a trip has multiple destinations or not
  hasMultipleDestinations(destinations: IDestination[]) {
    if (destinations.length > 1) {
      return true;
    }
    return false;
  }

  // function for handling errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
