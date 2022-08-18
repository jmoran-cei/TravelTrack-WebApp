import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITrip } from 'src/app/shared';

// export function checkDirtyState(component: EditTripComponent) {
//   if (component.isDirty)
//     return window.confirm(
//       'You have not saved this trip, do you really want to cancel?'
//     );
//   return true;
// }

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
    this.route.data.forEach((data) => {
      this.trip = data['trip'];
    });
    console.log(this.trip)
  }
}
