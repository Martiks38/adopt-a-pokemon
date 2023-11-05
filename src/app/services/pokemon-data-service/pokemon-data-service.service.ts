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
import { Pokemon, PokemonData, PokemonList } from 'src/app/typings/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonDataService {
  private baseUrl = environment.baseUrl;
  private limit = 10;
  private offset = 0;

  private readonly http = inject(HttpClient);

  getPokemon(name: string): Observable<Pokemon> {
    const pokemon$ = this.http
      .get<PokemonData>(`${this.baseUrl}/pokemon/${name}`)
      .pipe(
        retry(1),
        map((pokemon) => this.mappedPokemon(pokemon)),
        catchError((err) =>
          throwError(
            () =>
              new Error(
                `An error occurred while obtaining data for the Pokémon ${name}.`
              )
          )
        )
      );

    return pokemon$;
  }

  getPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<PokemonList>(
        `${this.baseUrl}/pokemon?limit=${this.limit}&offset=${this.offset}`
      )
      .pipe(
        retry(1),
        switchMap(({ results }) => {
          const observablesPokemons = results.map(({ url }) =>
            this.http.get<PokemonData>(url)
          );

          return forkJoin(observablesPokemons).pipe(
            map((pokemonDataArray) => {
              return pokemonDataArray.map((pokemon) =>
                this.mappedPokemon(pokemon)
              );
            })
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

  private mappedPokemon(pokemon: PokemonData): Pokemon {
    // La respuesta de los datos del pokémon incluyen más propiedas
    // Por esto, se extraen los datos referidos a la interface Pokemon
    const { name, height, weight, sprites, types } = pokemon;

    const {
      front_default,
      front_female,
      front_shiny,
      front_shiny_female,
      other,
    } = sprites;

    const typesMapped = types.map(({ type }) => type.name);

    const mappedPokemon: Pokemon = {
      name,
      height,
      weight,
      sprites: {
        front_default,
        front_female,
        front_shiny,
        front_shiny_female,
        other,
      },
      types: typesMapped,
    };

    return mappedPokemon;
  }
}
