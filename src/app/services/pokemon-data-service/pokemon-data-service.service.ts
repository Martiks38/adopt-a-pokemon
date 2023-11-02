import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  catchError,
  forkJoin,
  map,
  retry,
  switchMap,
  throwError,
} from 'rxjs';

import { environment } from 'src/app/environment/environment';
import { Pokemon, PokemonList } from 'src/app/typings/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonDataService {
  private baseUrl = environment.baseUrl;
  private limit = 10;
  private offset = 0;

  private readonly http = inject(HttpClient);

  getPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<PokemonList>(
        `${this.baseUrl}/pokemon?limit=${this.limit}&offset=${this.offset}`
      )
      .pipe(
        retry(1),
        switchMap(({ results }) => {
          const observablesPokemons = results.map(({ url }) =>
            this.http.get<Pokemon>(url)
          );

          return forkJoin(observablesPokemons).pipe(
            map((pokemonDataArray) => pokemonDataArray.map((data) => data))
          );
        }),
        catchError((err) =>
          throwError(
            () =>
              new Error('An error occurred while obtaining the Pokémon list.')
          )
        )
      );
  }
}
