import { Component } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from '../user/shared/authentication.service';

@Component({
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.css'],
})
export class HomePageComponent {
  isLoggedIn = this.auth.isLoggedIn$.pipe(take(1));

  constructor(public auth: AuthService) {}

  loginSignUp() {
    this.auth.login();
  }
}
