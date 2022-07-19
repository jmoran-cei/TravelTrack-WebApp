import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'create-trip',
  templateUrl: 'create-trip.component.html',
  styleUrls: ['create-trip.component.css']
})


export class CreateTripComponent {
  isDirty:boolean = true

  constructor(private router:Router) {}

  cancel() {
    this.router.navigate(['/trips'])
  }
}

export function checkDirtyState(component:CreateTripComponent) {
  if (component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?')
  return true
}
