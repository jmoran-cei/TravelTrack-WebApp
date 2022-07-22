import { Component, Input } from "@angular/core";
import { take } from "rxjs";
import { AuthService } from "../user/shared/authentication.service";

@Component({
  selector: 'nav-bar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})

export class NavbarComponent {
  isLoggedIn= this.auth.isLoggedIn$.pipe(take(1));

  constructor(public auth:AuthService){}

  adjustNameLength(name:string,numChars:number) {
    if (name.length>numChars) {
      return name.substring(0,numChars) + '..'
    }
    return name
  }

  logoutUser() {
    this.auth.logoutUser();
  }
}

