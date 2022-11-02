import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import {
  matchingPasswordsValidator,
  mismatchingPasswordsValidator,
} from 'src/app/forms';
import { AuthService, User, UserService } from '../../shared';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['../edit-profile.component.css'],
})
export class ChangePasswordFormComponent implements OnInit {
  passwordForm!: FormGroup;
  invalidPasswordFormAttempt = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private auth: AuthService
  ) {}

  // Password Form
  get currentPassword(): FormControl {
    return <FormControl>this.passwordForm.get('currentPassword');
  }
  get newPassword(): FormControl {
    return <FormControl>this.passwordForm.get('newPassword');
  }
  get confirmNewPassword(): FormControl {
    return <FormControl>this.passwordForm.get('confirmNewPassword');
  }

  ngOnInit() {
    this.populatePasswordForm();
  }

  populatePasswordForm() {
    this.passwordForm = this.fb.group(
      {
        currentPassword: this.fb.control('', [Validators.required]),
        newPassword: this.fb.control('', [
          Validators.required,
          Validators.pattern(
            '(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$'
          ),
        ]),
        confirmNewPassword: this.fb.control('', [Validators.required]),
      },
      { validator: [mismatchingPasswordsValidator, matchingPasswordsValidator] }
    );
  }

  changePassword() {
    this.passwordForm.markAllAsTouched();
    if (this.passwordForm.invalid) return;

    var updatedUser = this.passwordFormUserObject();

    this.auth
      .loginUser(updatedUser.username, this.currentPassword.value)
      .pipe(take(1))
      .subscribe((valid) => {
        if (valid) {
          this.updateUser(updatedUser);
        } else {
          this.invalidPasswordFormAttempt = true;
          this.passwordForm.markAllAsTouched();
        }
      });
  }

  passwordFormUserObject(): User {
    return {
      firstName: this.auth.currentUser.firstName,
      lastName: this.auth.currentUser.lastName,
      username: this.auth.currentUser.username,
      password: this.newPassword.value,
    };
  }

  updateUser(updatedUser: User) {
    return this.userService
      .updateUser(updatedUser)
      .pipe(take(1))
      .subscribe(() => {
        alert('You have successfully changed your password!');
        this.router.navigate(['/trips']);
        this.auth.currentUser = updatedUser;
      });
  }
}
