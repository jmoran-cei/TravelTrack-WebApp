import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../user/shared/authentication.service";
// import { IUser } from "../user/shared/user.model";
import { UserService } from "../user/shared/user.service";

@Component({
  selector: 'nav-bar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})

export class NavbarComponent {
  @Input() user:any

  constructor(public auth:AuthService){}

  ngOnInit() {
    // this.user = this.userService.getUserByUsername('dummyuser@dummy.dum')
  }

  adjustNameLength(name:string,numChars:number) {
    if (name.length>numChars) {
      return name.substring(0,numChars) + '..'
    }
    return name
  }
}

