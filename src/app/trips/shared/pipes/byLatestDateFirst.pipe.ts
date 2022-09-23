import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from 'src/app/shared/models/trip.model';

@Pipe({
  name: 'byLatestDate'
})
export class LatestDateFirstPipe implements PipeTransform {

  transform(values: Trip[]):Trip[] {
    return values.sort((a: Trip, b: Trip) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }
}
