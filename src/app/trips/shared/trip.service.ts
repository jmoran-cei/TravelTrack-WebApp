import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  forkJoin,
  map,
  Observable,
  of,
  retry,
  switchMap,
  take,
} from 'rxjs';
import { WebRequestService } from 'src/app/shared/services/web-request.service';
import { AuthService, User } from 'src/app/shared';
import { environment } from 'src/environments/environment';
import { Trip } from '../../shared/models/trip.model';

@Injectable()
export class TripService {
  tripsUrl = environment.TravelTrackAPI + '/trips';
  apiKey = environment.TravelTrackAPIKey;

  PlacesService = new google.maps.places.PlacesService(
    document.getElementById('empty')! as HTMLDivElement
  );

  constructor(private http: HttpClient, private auth: AuthService, private webRequestService: WebRequestService) {}

  // get all trips for the current user
  getCurrentUserTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl + '/user/' + this.auth.getCurrentUser().id, this.webRequestService.headers).pipe(
      map((trips) =>
        this.filterTripsByUsername(trips, this.auth.getCurrentUser().username)
      ),
      switchMap((trips: Trip[]) => {
        if (trips.length > 0) {
          // set trip thumbnail images
          return forkJoin(
            trips.map((trip: Trip) =>
              this.getTripImgURL(trip.destinations[0].id!).pipe(
                take(1),
                map((imgURL: string) => ({ ...trip, imgURL }))
              )
            )
          );
        }
        return of(trips);
      }),
      retry(2),
      catchError(this.webRequestService.handleError<Trip[]>('getTrips()', []))
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

    return this.http.get<Trip>(url, this.webRequestService.headers).pipe(
      switchMap((trip: Trip) =>
        // set trip image
        this.getTripImgURL(trip.destinations[0].id).pipe(
          map((imgURL: string) => ({ ...trip, imgURL }))
        )
      ),
      retry(2),
      catchError(this.webRequestService.handleError<Trip>('getTrip()'))
    );
  }

  // create new trip
  createTrip(trip: Trip): Observable<Trip> {
    return this.http
      .post<Trip>(this.tripsUrl, trip, this.webRequestService.headers)
      .pipe(catchError(this.webRequestService.handleError<Trip>('createTrip()')));
  }

  // save an edited trip
  updateTrip(trip: Trip): Observable<Trip> {
    return this.http
      .put<Trip>(`${this.tripsUrl}/${trip.id}`, trip, this.webRequestService.headers)
      .pipe(catchError(this.webRequestService.handleError<Trip>('createTrip()')));
  }

  // delete an existing trip
  deleteTrip(id: number): Observable<Trip> {
    const url = `${this.tripsUrl}/${id}`;

    return this.http
      .delete<Trip>(url, this.webRequestService.headers)
      .pipe(catchError(this.webRequestService.handleError<Trip>('createTrip()')));
  }

  sortByTitle(trips: Observable<Trip[]>): Observable<Trip[]> {
    return trips.pipe(
      map((trips) =>
        trips.sort((a: Trip, b: Trip) => a.title.localeCompare(b.title))
      )
    );
  }

  sortByEarliestDate(trips: Observable<Trip[]>): Observable<Trip[]> {
    // sorting by EARLIEST DATE: sorts dates oldest-newest
    return trips.pipe(
      map((trips) =>
        trips.sort(
          (a: Trip, b: Trip) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        )
      )
    );
  }

  sortByLatestDate(trips: Observable<Trip[]>): Observable<Trip[]> {
    // sorting by LATEST DATE: sorts dates newest-oldest
    return trips.pipe(
      map((trips) =>
        trips.sort(
          (a: Trip, b: Trip) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        )
      )
    );
  }

  // Unfortunately I can't store the requested Google photos to my DB because they are owned by Google Users (against Google's Terms of Service)
  // but I can still retrieve a relative trip photo URL by using the stored destination Ids (grabbed from autocomplete when trips are created)
  getTripImgURL(placeId: string): Observable<string> {
    return new Observable((obs) => {
      let getGooglePhotoForTrip = function (placeResult: any, status: any) {
        var imgUrl = 'assets/images/trips/default.jpg';
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          // obs.error(status)
          obs.next(imgUrl);
          obs.complete();
        } else {
          // if google has any photos for the given placeId
          if (placeResult.photos.length !== 0) {
            imgUrl = placeResult.photos[0].getUrl({
              maxWidth: 1920, // at least set one or the other - mandatory
              maxHeight: undefined,
            });
          }
          obs.next(imgUrl);
          obs.complete();
        }
      };

      this.PlacesService.getDetails(
        {
          placeId: placeId,
        },
        getGooglePhotoForTrip
      );
    });
  }
}
