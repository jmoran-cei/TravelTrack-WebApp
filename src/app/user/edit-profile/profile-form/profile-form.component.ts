import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { of, switchMap, take } from 'rxjs';
import { AuthService, User, UserService } from '../../shared';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['../edit-profile.component.css'],
})
export class ProfileFormComponent implements OnInit {
  profileForm!: FormGroup;
  invalidProfileFormAttempt = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private auth: AuthService
  ) {}

  get user(): User {
    return this.auth.currentUser;
  }
  get firstName(): FormControl {
    return <FormControl>this.profileForm.get('firstName');
  }
  get lastName(): FormControl {
    return <FormControl>this.profileForm.get('lastName');
  }
  get username(): FormControl {
    return <FormControl>this.profileForm.get('username');
  }
  get password(): FormControl {
    return <FormControl>this.profileForm.get('password');
  }

  ngOnInit(): void {
    this.populateProfileForm();
  }

  populateProfileForm() {
    this.profileForm = this.fb.group({
      firstName: this.fb.control(this.user.firstName, [Validators.required]),
      lastName: this.fb.control(this.user.lastName, [Validators.required]),
      username: this.fb.control(this.user.username), //disabled input
      password: this.fb.control('', [Validators.required]),
    });
  }

  saveProfile() {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.invalid) return;

    var updatedUser = this.profileFormUserObject();

    // validate password
    this.auth
      .loginUser(updatedUser.username, updatedUser.password)
      .pipe(
        take(1),
        switchMap((valid) => {
          if (valid) {
            this.userService.updateUser(updatedUser).pipe(take(1)).subscribe();
            return of(true);
          }
          return of(false);
        }))
      .subscribe((valid) => {
        if (valid) {
          alert('You have successfully updated your personal information!');
          this.router.navigate(['/trips']);
          this.auth.currentUser = updatedUser;
        }
        else {
          this.invalidProfileFormAttempt = true;
        }
      });
  }

  profileFormUserObject(): User {
    return {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      username: this.username.value,
      password: this.password.value,
    };
  }
}
