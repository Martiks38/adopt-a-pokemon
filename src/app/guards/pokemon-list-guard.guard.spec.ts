import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { pokemonListGuardGuard } from './pokemon-list-guard.guard';

describe('pokemonListGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => pokemonListGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
