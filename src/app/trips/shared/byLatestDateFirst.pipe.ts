import { Pipe, PipeTransform } from '@angular/core';
import { ITrip } from './trip.model';

@Pipe({
  name: 'byLatestDate'
})
export class LatestDateFirstPipe implements PipeTransform {

  transform(values: ITrip[]):ITrip[] {
    return values.sort((a: ITrip, b: ITrip) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }
}
