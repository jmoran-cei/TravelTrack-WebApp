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


// Possibilities:
  // - switch that filters from certain pipe based on a value that is changed from user clicking
  // - when user clicks a function resorts that list by that type of filter and applies it to the page
