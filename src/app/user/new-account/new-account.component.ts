import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { UsernameValidator } from 'src/app/forms/validators/userExists.validator';
import { User, UserService } from '../shared';

@Component({
  templateUrl: 'new-account.component.html',
  styleUrls: ['new-account.component.css'],
})
export class NewAccountComponent implements OnInit {
  mouseoverSubmit?: boolean;
  accountForm!: FormGroup;

  get firstName(): FormControl {
    return <FormControl>this.accountForm.get('firstName');
  }
  get lastName(): FormControl {
    return <FormControl>this.accountForm.get('lastName');
  }
  get username(): FormControl {
    return <FormControl>this.accountForm.get('username');
  }
  get password(): FormControl {
    return <FormControl>this.accountForm.get('password');
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.createAccountForm();
  }

  createAccountForm() {
    this.accountForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      username: this.fb.control(
        '',
        [Validators.required, Validators.email],
        [UsernameValidator.createValidator(this.userService, true)]
      ),
      password: this.fb.control('', [
        Validators.required,
        Validators.pattern(
          '(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$'
        ),
      ]),
    });
  }

  createAccount() {
    //funcionality will be further implemeneted in the near future
    this.accountForm.markAllAsTouched();
    if (this.accountForm.invalid) return;

    this.userService
      .createUser(this.newUserObject())
      .pipe(
        take(1),
        // tap((newUser) => console.table(newUser))
      )
      .subscribe(() => {
        alert('You have successfully created an account! Please sign in.');
        this.router.navigate(['/user/login']);
      });
  }

  newUserObject(): User {
    return {
      //id: Date.now().valueOf(), // unique ; used for in mem web api
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      username: this.username.value.toLowerCase(),
      password: this.password.value,
    };
  }
}
