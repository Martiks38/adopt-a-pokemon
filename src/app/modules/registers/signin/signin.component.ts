import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { minCharactersPassword } from 'src/assets/constants';

type FormErrors = {};

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  minlengthPassword: number = minCharactersPassword;

  userForm: FormGroup;
  errors: FormErrors | null = null;

  constructor(private readonly formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(this.minlengthPassword),
        ],
      }),
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const password = this.userForm.get('password');
    const email = this.userForm.get('email');

    const invalidEmail = email?.invalid;
    const invalidPassword = password?.invalid;

    if (invalidEmail) {
    }
  }
}
