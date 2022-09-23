import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../../../shared/models/trip.model';

@Pipe({
  name: 'byEarliestDate',
})
export class EarliestDateFirstPipe implements PipeTransform {
  transform(values: Trip[]): Trip[] {
    return values.sort(
      (a: Trip, b: Trip) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  }
}
