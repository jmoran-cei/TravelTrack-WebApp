import { ComponentFixture, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FormFieldComponent, ValidationAlertComponent } from 'src/app/forms';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { TripsListComponent } from 'src/app/trips';
import { AuthService, UserService } from '../../shared';
import { UserModule } from '../../user.module';

import { ChangePasswordFormComponent } from './change-password-form.component';

describe('ChangePasswordFormComponent', () => {
  let component: ChangePasswordFormComponent;
  let fixture: ComponentFixture<ChangePasswordFormComponent>;
  let authService: AuthService;
  let userService: UserService;
  let currentUser = {
    firstName: 'Test',
    lastName: 'User',
    username: 'testuser@test.test',
    password: 'P@ssw0rd',
  };
  let userWithNewPassword = {
    firstName: 'Test',
    lastName: 'User',
    username: 'testuser@test.test',
    password: 'P@ssw0rd123',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserModule,
        SharedModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'trips', component: TripsListComponent },
        ]),
      ],
      providers: [
        FormBuilder,
        UserService,
        AuthService
      ],
      declarations: [
        ChangePasswordFormComponent,
        FormFieldComponent,
        ValidationAlertComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePasswordFormComponent);
    component = fixture.componentInstance;

    // inject services for mocking
    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserService);

    // initialize current logged in user
    spyOn(authService, 'currentUser' as any).and.returnValue(currentUser);

    fixture.detectChanges();
  });

  it('should render without errors', () => {
    expect(component).toBeTruthy();
  });

  // check: form interaction works properly
  it('should check the form control values inside the passwordForm group', () => {
    const currentPassword: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#currentPassword');
    const newPassword: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#newPassword');
    const confirmNewPassword: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#confirmNewPassword');

    // set values
    currentPassword.value = currentUser.password;
    newPassword.value = userWithNewPassword.password;
    confirmNewPassword.value = userWithNewPassword.password;

    // generate events
    currentPassword.dispatchEvent(new Event('input'));
    newPassword.dispatchEvent(new Event('input'));
    confirmNewPassword.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Assert
    expect(component.passwordForm.value).toEqual({
      currentPassword: currentUser.password,
      newPassword: userWithNewPassword.password,
      confirmNewPassword: userWithNewPassword.password,
    });
  });

  // invalid form attempt
  it('should do nothing when changePassword() is called and passwordForm is invalid', () => {
    spyOn(ChangePasswordFormComponent.prototype, 'changePassword').and.callThrough();
    spyOn(authService, 'loginUser');

    // invalid
    component.passwordForm.get('confirmNewPassword')!.setValue('');

    // submit, calling changePassword()
    fixture.debugElement
      .query(By.css('button'))
      .triggerEventHandler('ngSubmit', component.changePassword());

    // Assert
    expect(component.changePassword).toHaveBeenCalled(); // before
    expect(component.passwordForm.touched).toBeTrue();
    expect(authService.loginUser).not.toHaveBeenCalled();
  });

  // wrong password attempt
  it('should call auth.login() and fail to authenticate with wrong current password', () => {
    spyOn(ChangePasswordFormComponent.prototype, 'changePassword').and.callThrough();
    spyOn(userService, 'updateUser');
    spyOn(authService, 'loginUser').and.returnValue(of(false));

    // set valid (wrong) values
    component.currentPassword.setValue('wrongP@ssw0rd');
    component.newPassword.setValue(userWithNewPassword.password);
    component.confirmNewPassword.setValue(userWithNewPassword.password);

    // submit, calling changePassword()
    fixture.debugElement
      .query(By.css('button'))
      .triggerEventHandler('ngSubmit', component.changePassword());

    // Assert
    expect(component.changePassword).toHaveBeenCalled();
    expect(authService.loginUser).toHaveBeenCalled();
    expect(userService.updateUser).not.toHaveBeenCalled();
    expect(component.invalidPasswordFormAttempt).toBeTrue();
  });

  it('should call auth.login() and successfully authenticate with correct current password', () => {
    spyOn(ChangePasswordFormComponent.prototype, 'changePassword').and.callThrough();
    spyOn(userService, 'updateUser').and.returnValue(of(userWithNewPassword));
    spyOn(authService, 'loginUser').and.returnValue(of(true));

    // set valid (correct) values
    component.currentPassword.setValue(currentUser.password);
    component.newPassword.setValue(userWithNewPassword.password);
    component.confirmNewPassword.setValue(userWithNewPassword.password);

    // submit, calling changePassword()
    fixture.debugElement
      .query(By.css('button'))
      .triggerEventHandler('ngSubmit', component.changePassword());

    // Assert
    expect(component.changePassword).toHaveBeenCalled(); // before
    expect(authService.loginUser).toHaveBeenCalled();
    expect(component.invalidPasswordFormAttempt).toBeFalse();
    expect(userService.updateUser).toHaveBeenCalled();
  });

  // successfully change password
  it('shoud call userService.updatedUser() and successfully update the user with the new password', () => {
    spyOn(userService, 'updateUser').and.returnValue(of(userWithNewPassword));
    spyOn(authService, 'loginUser').and.returnValue(of(true));

    // set valid (correct) values
    component.currentPassword.setValue(currentUser.password);
    component.newPassword.setValue(userWithNewPassword.password);
    component.confirmNewPassword.setValue(userWithNewPassword.password);

    // submit, calling changePassword()
    fixture.debugElement
      .query(By.css('button'))
      .triggerEventHandler('ngSubmit', component.changePassword());

    // Assert
    expect(authService.loginUser).toHaveBeenCalled(); // before
    expect(userService.updateUser).toHaveBeenCalled();
    expect(authService.currentUser.password).toEqual(userWithNewPassword.password);
  });
});
