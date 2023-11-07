import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  static onlyLetters(control: AbstractControl) {
    const value = control.value;
    const regex = /^[a-z\s]*$/i;

    if (!regex.test(value)) {
      return { onlyLetters: true };
    }

    return null;
  }
}
