import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { changeUserConnection } from 'src/app/shared/state';
import { minCharactersPassword } from 'src/assets/constants';

type FormErrors = {
  email: {
    email?: boolean;
    required?: boolean;
  } | null;
  password: {
    minlength?: { requiredLength: number; actualLength: number };
    required?: boolean;
  } | null;
  isInvalidConnection: boolean | null;
};

const initialErrors = {
  email: null,
  password: null,
  isInvalidConnection: null,
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  minlengthPassword: number = minCharactersPassword;

  userForm: FormGroup;
  errors: FormErrors = initialErrors;

  constructor(
    private readonly formBuilder: FormBuilder,
    private userSvc: UserService,
    private router: Router,
    private store: Store
  ) {
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
      this.errors = { ...this.errors, email: email.errors };
    } else {
      this.errors = { ...this.errors, email: null };
    }

    if (invalidPassword) {
      this.errors = { ...this.errors, password: password.errors };
    } else {
      this.errors = { ...this.errors, password: null };
    }

    this.userSvc
      .createUser({ email: email?.value, password: password?.value })
      .pipe(
        catchError((err: any) => {
          this.errors = { ...initialErrors, isInvalidConnection: !err?.state };

          return throwError(() => err?.msg);
        })
      )
      .subscribe(({ state }) => {
        this.errors = { ...initialErrors, isInvalidConnection: !state };
        this.store.dispatch(changeUserConnection());

        this.router.navigate(['../']);
      });
  }
}
