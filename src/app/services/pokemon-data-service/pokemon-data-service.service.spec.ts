import { TestBed } from '@angular/core/testing';

import { PokemonDataService } from './pokemon-data-service.service';

describe('PokemonsService', () => {
  let service: PokemonDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
