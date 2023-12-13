import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USERS } from 'src/assets/db/users';

import type { UserInformation } from 'src/app/typings/user';

type Response = {
  msg: string;
  state: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: UserInformation[] = [];

  constructor() {
    this.users = USERS;
  }

  loginUser(formData: UserInformation): Observable<Response> {
    const { email, password } = formData;

    const user = this.users.find(
      (user: UserInformation) => user.email === email
    );

    return new Observable((observer) => {
      if (user && user.password === password) {
        observer.next({
          state: true,
          msg: 'User logged in.',
        });
      } else {
        observer.error({
          state: false,
          msg: 'The email and/or password are incorrect.',
        });
      }

      observer.complete();
    });
  }

  createUser(formData: UserInformation): Observable<Response> {
    const user = this.users.find(
      (user: UserInformation) => user.email === formData.email
    );

    if (user) {
      return new Observable((observer) => {
        setTimeout(() => {
          observer.error({ msg: 'User already exists.', state: false });
          observer.complete();
        }, 300);
      });
    }

    const cpyUsers = structuredClone(this.users);

    this.users = [...cpyUsers, formData];

    return new Observable((observer) => {
      setTimeout(() => {
        observer.next({ msg: 'User created.', state: true });
        observer.complete();
      }, 300);
    });
  }
}
