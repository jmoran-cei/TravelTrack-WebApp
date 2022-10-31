import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Trip } from '../models/trip.model';

@Pipe({
  name: 'byEarliestDate',
})
export class EarliestDateFirstPipe implements PipeTransform {
  transform(values: Observable<Trip[]>): Observable<Trip[]> {
    return values.pipe(map(trips => trips.sort(
      (a: Trip, b: Trip) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )));
  }
}
