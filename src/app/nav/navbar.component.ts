import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription, take } from 'rxjs';
import { AuthService, UserService } from '../shared';

@Component({
  selector: 'app-nav-bar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = this.auth.isLoggedIn$;
  currentUser$ = this.auth.currentUser$;
  path!: string;
  isTripPage!: boolean;
  pathSubscription!: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.pathSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let paths = this.router.url.split('/');

        // if the path is 'trips/'
        if (paths[1] === 'trips')
          // is on 'trips/:id' if, subpath is a number (valid trip id)
          this.isTripPage = !isNaN(paths[2] as any);
        else this.isTripPage = false;
      });
  }

  ngOnDestroy() {
    this.pathSubscription.unsubscribe();
  }

  // cuts long name lengths with '...' to fit UI
  adjustNameLength(name: string, numChars: number) {
    if (name.length > numChars) {
      return name.substring(0, numChars) + '..';
    }
    return name;
  }

  // redirect to Azure AD B2C login page
  login() {
    this.auth.login();
  }

  // logout and redirect to /home
  logoutUser() {
    this.auth.logout();
  }

  editProfile() {
    this.userService.editProfile();
  }
}
