import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
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
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createLoginForm();

    // resets invalidAttempt boolean when user starts typing again
    this.formStatusSubscription = this.loginForm.valueChanges.subscribe(() => {
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

  login(username: string, password: string) {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      this.invalidAttempt = true;
      this.loginForm.markAsUntouched();
      return;
    }

    this.authService
      .loginUser(username, password)
      .pipe(take(1))
      .subscribe((valid) => {
        if (valid) {
          this.router.navigate(['trips']);
        } else {
          this.invalidAttempt = true;
          this.loginForm.markAsUntouched();
        }
      });
  }
}
