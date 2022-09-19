import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/user';

export class UsernameValidator {
  static createValidator(userService: UserService, returnOpposite: boolean): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return userService
        .checkUsernameExists(control.value)
        .pipe(
          map((result: boolean) => {
            if (!returnOpposite) {
              return !result ? { usernameExists: true } : null
            } else {
              return result ? { usernameExists: true } : null
            }
          }
          )
        ) as Observable<ValidationErrors>;
    };
  }
}
