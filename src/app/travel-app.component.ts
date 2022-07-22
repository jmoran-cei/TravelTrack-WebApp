import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'travel-app',
  templateUrl: 'travel-app.component.html'
})

export class TravelAppComponent {

  constructor(public router:Router) {}
}
