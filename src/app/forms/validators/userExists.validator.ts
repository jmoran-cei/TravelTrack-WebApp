import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/user';

export class UsernameValidator {
  static createValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return userService
        .checkUsernameExists(control.value)
        .pipe(
          map((result: boolean) =>
            !result ? { usernameExists: true } : null
          )
        ) as Observable<ValidationErrors>;
    };
  }
}
