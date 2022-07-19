import { Component, Input } from "@angular/core";
import { AuthService } from "src/app/user";

@Component({
  selector: 'home-section1',
  templateUrl: 'home-section1.component.html',
  styleUrls: ['home-section1.component.css']
})

export class HomeSection1Component {

  constructor(public auth:AuthService) {}

}
