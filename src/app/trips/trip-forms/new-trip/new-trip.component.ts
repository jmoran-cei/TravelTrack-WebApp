import { Component, Input, OnInit } from '@angular/core';
import { Trip } from 'src/app/shared';
import { NavigationService } from 'src/app/shared';

// this function will be probably used in other components down the road (e.g. edit-profile)
// What seems like the most 'fitting' spot to put this?
// should it have it's own file (reconfigure it as checkDirtyState.guard, etc.)?  and be put in a shared guards folder or..
export function checkDirtyState(component: NewTripComponent) {
  if (component.isDirty)
    return confirm(
      'You have not saved this trip, do you really want to cancel?'
    );
  return true;
}

@Component({
  selector: 'app-new-trip',
  templateUrl: 'new-trip.component.html',
  styleUrls: ['new-trip.component.css'],
})
export class NewTripComponent implements OnInit {
  isDirty?: boolean;
  pageTitle!: string;
  pageTitleDefault = 'Your New Trip';
  @Input() isEditing!: boolean;
  @Input() existingTrip!: Trip;

  constructor(public nav: NavigationService) {}

  // updated from child component via @Output()
  // method for updating the page's title to match the user's title of their new trip
  updatePageTitle(updatedTitle: string) {
    this.pageTitle = updatedTitle;
    if (updatedTitle === '') this.pageTitle = this.pageTitleDefault;
  }

  ngOnInit() {
    if (this.isEditing) this.pageTitle = this.existingTrip.title;
    else this.pageTitle = this.pageTitleDefault;
  }
}
