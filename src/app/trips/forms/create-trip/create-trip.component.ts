import { Component } from '@angular/core';

// this function will be probably used in other components down the road (e.g. edit-profile)
// What seems like the most 'fitting' spot to put this?
// should it have it's own file (reconfigure it as checkDirtyState.guard, etc.)?  and be put in a shared guards folder or..
export function checkDirtyState(component: CreateTripComponent) {
  if (component.isDirty)
    return window.confirm(
      'You have not saved this trip, do you really want to cancel?'
    );
  return true;
}

@Component({
  selector: 'create-trip',
  templateUrl: 'create-trip.component.html',
  styleUrls: ['create-trip.component.css'],
})
export class CreateTripComponent {
  isDirty?: boolean;
  pageTitle!:string;
  pageTitleDefault= 'Your New Trip';

  // updated from child component via @Output()
  // method for updating the page's title to match the user's title of their new trip
  updatePageTitle(updatedTitle:any) {
    this.pageTitle = updatedTitle;
    if (updatedTitle === "")
      this.pageTitle = this.pageTitleDefault
  }

  ngOnInit() {
    this.pageTitle=this.pageTitleDefault;
  }
}
