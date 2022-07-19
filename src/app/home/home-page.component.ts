import { Component } from "@angular/core";
import { AuthService } from "../user/shared/authentication.service";

@Component({
  // selector: 'home-page',
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.css']
})

export class HomePageComponent {
  // FINISH YOUR BUCKET LIST: box 1 details
  boxTitle1 = "Finish your bucket list."
  boxDesc1 = `Nunc non varius metus. Cras vitae libero sed leo ultrices malesuada. Nullam luctus enim et luctus euismod.
  Maecenas quis vulputate nibh, non molestie ligula. Nulla at luctus quam. Donec ultrices urna vel quam tempus,
  vel molestie purus bibendum. Cras nec sollicitudin nulla.`

  // TRAVEL THE WORLD: box 2 details
  boxTitle2 = "Travel the World."
  boxDesc2 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer condimentum, nunc ut ultricies tincidunt, mi
  orci venenatis orci, sit amet elementum felis sem non metus. Nam id aliquam urna. Curabitur tincidunt gravida
  rhoncus. Etiam ac diam odio. Sed bibendum id sem in aliquet. Maecenas lacus quam, dignissim non.`

  // NEVER FORGET IT: box 3 details
  boxTitle3 = "Never forget it."
  boxDesc3 = `Fusce placerat, felis ac euismod congue, nunc mi hendrerit leo, at pretium neque augue vel metus. In hac
  habitasse platea dictumst. Sed fringilla odio lectus, ac condimentum ligula rhoncus scelerisque. Class aptent
  taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`

  constructor(public auth:AuthService) {}


}
