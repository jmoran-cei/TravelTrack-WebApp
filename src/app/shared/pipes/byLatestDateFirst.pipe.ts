import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Trip } from 'src/app/shared/models/trip.model';

@Pipe({
  name: 'byLatestDate',
})
export class LatestDateFirstPipe implements PipeTransform {
  transform(values: Observable<Trip[]>): Observable<Trip[]> {
    return values.pipe(map(trips => trips.sort(
      (a: Trip, b: Trip) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )));
  }
}
