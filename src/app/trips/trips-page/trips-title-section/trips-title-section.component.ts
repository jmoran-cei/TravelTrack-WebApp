import { Component, Input, NgZone } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { NavigationService } from 'src/app/shared';
import { Trip } from '../../../shared/models/trip.model';
import { TripService } from '../../shared/trip.service';

@Component({
  selector: 'app-trips-title-section',
  templateUrl: 'trips-title-section.component.html',
  styleUrls: ['trips-title-section.component.css'],
})
export class TripsTitleSectionComponent {
  @Input() title = '';
  @Input() collapseID = '';
  @Input() tripList: Observable<Trip[]> = of();
  @Input() sortToggle = '';

  constructor(
    public tripService: TripService,
    private ngZone: NgZone,
    public nav: NavigationService
  ) {}

  sortByTitle() {
    this.ngZone.run(() => {
      this.tripService
        .sortByTitle(this.tripList)
        .pipe(take(1))
        .subscribe((trips) => (this.tripList = of(trips)));
      this.sortToggle = 'sortByTitle';
    });
  }

  sortByEarliestDate() {
    this.ngZone.run(() => {
      this.tripService
        .sortByEarliestDate(this.tripList)
        .pipe(take(1))
        .subscribe((trips) => (this.tripList = of(trips)));
      this.sortToggle = 'sortByEarliestDate';
    });
  }

  sortByLatestDate() {
    this.ngZone.run(() => {
      this.tripService
        .sortByLatestDate(this.tripList)
        .pipe(take(1))
        .subscribe((trips) => (this.tripList = of(trips)));
      this.sortToggle = 'sortByLatestDate';
    });
  }
}
