import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormFieldComponent, ValidationAlertComponent } from 'src/app/forms';
import { AuthService, UserService } from '../../shared';
import { ProfileFormComponent } from './profile-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { UserModule } from '../../user.module';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TripsListComponent } from 'src/app/trips';

describe('ProfileFormComponent', () => {
  // let component: ProfileFormComponent;///
  let fixture: ComponentFixture<ProfileFormComponent>;
  let component: ProfileFormComponent;
  let authService: AuthService;
  let userService: UserService;
  let currentUser = {
    firstName: 'Test',
    lastName: 'User',
    username: 'testuser@test.test',
    password: 'P@ssw0rd',
  };
  let changedUser = {
    firstName: 'Test',
    lastName: 'UserChanged',
    username: 'testuser@test.test',
    password: 'P@ssw0rd',
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
        AuthService,
      ],
      declarations: [
        ProfileFormComponent,
        FormFieldComponent,
        ValidationAlertComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileFormComponent);
    component = fixture.componentInstance;

    // inject services for mocking
    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserService);
    // initialize current logged in user
    spyOn(authService, 'currentUser' as any).and.returnValue(currentUser);

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render without errors', () => {
    expect(component).toBeTruthy();
  });

  // check: form interaction works properly
  it('should have an invalid form when input values are empty', () => {
    const firstName: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#firstName');
    const lastName: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#lastName');
    const username: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#username');
    const password: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#password');

    // set empty values
    firstName.value = '';
    lastName.value = '';
    username.value = '';
    password.value = '';

    // generate events
    firstName.dispatchEvent(new Event('input'));
    lastName.dispatchEvent(new Event('input'));
    username.dispatchEvent(new Event('input'));
    password.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Assert
    expect(component.profileForm.invalid).toBeTrue();
  });

  // check: form interaction works properly
  it('should check the form control values inside the profileForm group', () => {
    const firstName: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#firstName');
    const lastName: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#lastName');
    const username: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#username');
    const password: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#password');

    // set values
    firstName.value = currentUser.firstName;
    lastName.value = currentUser.lastName;
    username.value = currentUser.username;
    password.value = currentUser.password;

    // generate events
    firstName.dispatchEvent(new Event('input'));
    lastName.dispatchEvent(new Event('input'));
    username.dispatchEvent(new Event('input'));
    password.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Assert
    expect(component.profileForm.value).toEqual({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      username: currentUser.username,
      password: currentUser.password,
    });
  });

  // invalid form attempt
  it('should do nothing when saveProfile() is called and profileForm is invalid', () => {
    spyOn(ProfileFormComponent.prototype, 'saveProfile').and.callThrough();
    spyOn(authService, 'loginUser' as any);
    fixture.detectChanges();

    // invalid
    component.profileForm.get('password')!.setValue('');

    // submit, calling saveProfile()
    fixture.debugElement
      .query(By.css('button'))
      .triggerEventHandler('ngSubmit', component.saveProfile());
    fixture.detectChanges();

    // Assert
    expect(component.saveProfile).toHaveBeenCalled(); // before
    expect(component.profileForm.touched).toBeTrue();
    expect(authService.loginUser).not.toHaveBeenCalled();
  });

  // wrong password attempt
  it('should call auth.login() and fail to authenticate with wrong password', () => {
    spyOn(ProfileFormComponent.prototype, 'saveProfile').and.callThrough();
    spyOn(userService, 'updateUser' as any);
    spyOn(authService, 'loginUser' as any).and.returnValue(of(false));
    fixture.detectChanges();

    // set valid values
    component.profileForm.get('firstName')!.setValue(currentUser.firstName);
    component.profileForm.get('lastName')!.setValue(currentUser.lastName);
    component.profileForm.get('username')!.setValue(currentUser.username);
    component.profileForm.get('password')!.setValue(currentUser.password);

    // submit, calling saveProfile()
    fixture.debugElement
      .query(By.css('button'))
      .triggerEventHandler('ngSubmit', component.saveProfile());
    fixture.detectChanges();

    // Assert
    expect(component.saveProfile).toHaveBeenCalled();
    expect(authService.loginUser).toHaveBeenCalled();
    expect(userService.updateUser).not.toHaveBeenCalled();
    expect(component.invalidProfileFormAttempt).toBeTrue();
  });

  // correct password attempt
  it('should call auth.login() and succesufully authenticate with correct password', () => {
    spyOn(ProfileFormComponent.prototype, 'saveProfile').and.callThrough();
    spyOn(userService, 'updateUser' as any).and.returnValue(of(changedUser));
    spyOn(authService, 'loginUser' as any).and.returnValue(of(true));
    fixture.detectChanges();

    // set valid values
    component.profileForm.get('firstName')!.setValue(currentUser.firstName);
    component.profileForm.get('lastName')!.setValue(currentUser.lastName);
    component.profileForm.get('username')!.setValue(currentUser.username);
    component.profileForm.get('password')!.setValue(currentUser.password);

    // submit, calling saveProfile()
    fixture.debugElement
      .query(By.css('button'))
      .triggerEventHandler('ngSubmit', component.saveProfile());
    fixture.detectChanges();

    // Assert
    expect(component.saveProfile).toHaveBeenCalled(); // before
    expect(authService.loginUser).toHaveBeenCalled();
    expect(component.invalidProfileFormAttempt).not.toBeTrue();
    expect(userService.updateUser).toHaveBeenCalled();
  });

  // successfully update user
  it('should call userService.updateUser() and successfully update user', () => {
    spyOn(ProfileFormComponent.prototype, 'saveProfile').and.callThrough();
    spyOn(userService, 'updateUser' as any).and.returnValue(of(changedUser));
    spyOn(authService, 'loginUser' as any).and.returnValue(of(true));

    // set valid values
    component.profileForm.get('firstName')!.setValue(changedUser.firstName);
    component.profileForm.get('lastName')!.setValue(changedUser.lastName);
    component.profileForm.get('username')!.setValue(changedUser.username);
    component.profileForm.get('password')!.setValue(changedUser.password);

    // submit, calling saveProfile()
    fixture.debugElement
      .query(By.css('button'))
      .triggerEventHandler('ngSubmit', component.saveProfile());
    fixture.detectChanges();

    // Assert
    expect(authService.loginUser).toHaveBeenCalled(); // before
    expect(userService.updateUser).toHaveBeenCalled();
    expect(authService.currentUser).toEqual(changedUser);
  });
});
