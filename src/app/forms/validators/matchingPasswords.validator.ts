import { AbstractControl } from '@angular/forms';

export function matchingPasswordsValidator(
  c: AbstractControl
): { [key: string]: boolean } | null {
  return c.get('currentPassword')?.value !== c.get('newPassword')?.value
    ? null
    : { matchingPasswords: true };
}
