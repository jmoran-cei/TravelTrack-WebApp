import { Injectable } from '@angular/core';

@Injectable()
export class TripDataService {
  // if only one date is provided as param, then it compares the given date with the current date
  // returns the number of days given two dates
  numDayDifference(endDate: Date, startDate?: Date): number {
    const oneDay = 1000 * 60 * 60 * 24;
    const currentDate = new Date();

    if (!startDate) {
      startDate = currentDate;
    }
    let ms = new Date(endDate).getTime() - new Date(startDate).getTime();
    let days = Math.floor(ms / oneDay) + 1;

    return days;
  }
}
