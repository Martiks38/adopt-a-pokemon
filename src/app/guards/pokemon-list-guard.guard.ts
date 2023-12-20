import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectGetUserPokemons } from '../shared/state';
import { tap } from 'rxjs';

export const pokemonListGuardGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  let isConnected: boolean = false;

  store
    .select(selectGetUserPokemons)
    .pipe(
      tap((connection) => {
        isConnected = connection;
      })
    )
    .subscribe();

  if (!isConnected) {
    router.navigate(['login']);
  }

  return isConnected;
};
