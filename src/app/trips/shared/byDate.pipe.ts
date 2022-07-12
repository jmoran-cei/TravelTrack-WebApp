import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byDate'
})
export class TripByDatePipe implements PipeTransform {

  transform(values: any[]): any[] {
    return values.sort((a: any, b: any) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }
}


// Possibilities:
  // - switch that filters from certain pipe based on a value that is changed from user clicking
  // - when user clicks a function resorts that list by that type of filter and applies it to the page
