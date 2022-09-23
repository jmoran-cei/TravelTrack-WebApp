import { AbstractControl } from '@angular/forms';

export function datesInOrderValidator(
  c: AbstractControl
): { [key: string]: boolean } | null {
  const startDate = c.get('startDate');
  const endDate = c.get('endDate');

  if (startDate?.pristine || endDate?.pristine) {
    return null;
  }

  if (startDate?.value > endDate?.value) {
    return { notInOrder: true };
  }
  return null;
}
