import { Pipe, PipeTransform } from '@angular/core';
import { ITrip } from '../../../shared/models/trip.model';

@Pipe({
  name: 'byEarliestDate'
})
export class EarliestDateFirstPipe implements PipeTransform {

  transform(values: ITrip[]):ITrip[] {
    return values.sort((a: ITrip, b: ITrip) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }
}

