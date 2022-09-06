import { Component } from "@angular/core";
import { take } from "rxjs";
import { AuthService } from "src/app/user";

@Component({
  selector: 'app-home-section1',
  templateUrl: 'home-section1.component.html',
  styleUrls: ['home-section1.component.css']
})

export class HomeSection1Component {
  isLoggedIn = this.auth.isLoggedIn$.pipe(take(1));

  constructor(public auth:AuthService) {}

}
