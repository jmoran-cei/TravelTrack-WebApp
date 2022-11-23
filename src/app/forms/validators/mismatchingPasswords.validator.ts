import { AbstractControl } from '@angular/forms';

export function mismatchingPasswordsValidator(
  c: AbstractControl
): { [key: string]: boolean } | null {
  return c.get('newPassword')?.value === c.get('confirmNewPassword')?.value
    ? null
    : { mismatchingPasswords: true };
}
