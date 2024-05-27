import { Injectable } from '@angular/core';
import { AbstractControl, Validator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MatchPasswordService implements Validator{

  constructor() { }

  validate(formGroup: AbstractControl) {
    const { password, passwordConfirmation } = formGroup.value
    if (password === passwordConfirmation) {
        return null
    } else {
        return { passwordDosentMatch: true }
    }
}
}
