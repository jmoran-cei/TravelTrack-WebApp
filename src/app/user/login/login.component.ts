import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { UsernameValidator } from 'src/app/forms/validators/userExists.validator';
import { UserService } from '../shared';
import { AuthService } from '../shared/authentication.service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  mouseoverLogin?: boolean;
  loginForm!: FormGroup;
  invalidAttempt = false;
  formStatusSubscription?: Subscription;

  get username(): FormControl {
    return <FormControl>this.loginForm.get('username');
  }

  get password(): FormControl {
    return <FormControl>this.loginForm.get('password');
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createLoginForm();

    this.formStatusSubscription = this.loginForm.statusChanges.subscribe(() => {
      if (this.loginForm.invalid) this.invalidAttempt = false;
    });
  }

  ngOnDestroy() {
    this.formStatusSubscription?.unsubscribe();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  login(username: string, password: string): boolean {
    if (this.loginForm.invalid) return false;
    this.loginForm.markAllAsTouched();
    if (this.authService.loginUser(username, password)) {
      this.router.navigate(['trips']);
      return true;
    } else {
      this.invalidAttempt = true;
      this.loginForm.markAsUntouched();
    }
    return false;
  }
}
