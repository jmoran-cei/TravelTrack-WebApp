import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITrip } from 'src/app/shared';

@Component({
  selector: 'edit-trip',
  templateUrl: 'edit-trip.component.html',
  styleUrls: ['../new-trip/new-trip.component.css'],
})
export class EditTripComponent {
  isDirty?: boolean;
  trip!: ITrip;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.parent?.data.forEach((data) => {
      this.trip = data['trip'];
    });
    console.log(this.trip)
  }
}
