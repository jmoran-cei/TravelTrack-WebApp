import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService, User, UserService } from '../shared';

@Component({
  templateUrl: 'edit-profile.component.html',
  styleUrls: ['edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;

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

  ngOnInit() {
    this.populateProfileForm();
  }

  populateProfileForm() {
    this.profileForm = this.fb.group({
      firstName: this.fb.control(this.user.firstName, [Validators.required]),
      lastName: this.fb.control(this.user.lastName, [Validators.required]),
      username: this.fb.control(this.user.username), //disabled input
      password: this.fb.control('', [
        Validators.required,
        Validators.pattern(
          '(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$'
        ),
      ]),
    });
  }

  saveProfile() {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.invalid) return;

    var updatedUser = this.savedUserObject();

    this.userService
      .updateUser(updatedUser)
      .pipe(take(1))
      .subscribe(() => {
        alert('You have successfully updated your account!');
        this.router.navigate(['/trips']);
        this.auth.currentUser = updatedUser;
      });
  }

  savedUserObject(): User {
    return {
      id: this.user.id,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      username: this.username.value,
      password: this.password.value,
      address: [], // I'll be removing address property from model, data, etc.
      pictureURL: 'assets/images/users/dummy1.jpg',
    };
  }

  cancel() {
    this.router.navigate(['/trips']);
  }
}
