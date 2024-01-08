import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  forkJoin,
  map,
  retry,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/app/environment/environment';
import {
  Pokemon,
  PokemonData,
  FetchAllPokemonsResponse,
} from 'src/app/typings/pokemon';
import { getLimitPokemons } from 'src/assets/constants';
import type { PageLinks } from 'src/app/typings';

@Injectable({
  providedIn: 'root',
})
export class PokemonDataService {
  private baseUrl = environment.baseUrl;

  private navigation = {
    previous: false,
    next: true,
    offset: 0,
    totalPages: 0,
  };
  private navigationSubject = new BehaviorSubject<PageLinks>({
    previous: false,
    next: true,
    offset: 0,
    totalPages: 0,
  });
  public navigation$ = this.navigationSubject.asObservable();

  private readonly http = inject(HttpClient);

  setNavigationPageLinks(pageLinks: PageLinks) {
    this.navigationSubject.next(pageLinks);
  }

  setNextPage() {
    this.navigation.offset = Math.min(
      this.navigation.offset + 1,
      this.navigation.totalPages
    );
    this.activeButtons();
  }

  setPreviousPage() {
    this.navigation.offset = Math.max(this.navigation.offset - 1, 0);
    this.activeButtons();
  }

  setPageNumber(page: number) {
    this.navigation.offset = page;

    this.navigationSubject.next(this.navigation);
  }

  activeButtons() {
    this.navigation.previous = this.navigation.offset > 0;
    this.navigation.next = this.navigation.offset < this.navigation.totalPages;
    this.navigationSubject.next(this.navigation);
  }

  getPokemon(name: string): Observable<Pokemon> {
    const pokemon$ = this.http
      .get<PokemonData>(`${this.baseUrl}/pokemon/${name.toLowerCase()}`)
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

  getAllPokemons(): Observable<Pokemon[]> {
    const url = `${this.baseUrl}/pokemon?limit=${getLimitPokemons}&offset=${
      this.navigation.offset * getLimitPokemons
    }`;

    return this.http.get<FetchAllPokemonsResponse>(url).pipe(
      retry(1),
      tap((resApi) => {
        if (this.navigation.totalPages === 0) {
          const pageNumber = Math.ceil(resApi.count / getLimitPokemons);

          this.navigation.totalPages = pageNumber;

          this.navigationSubject.next(this.navigation);
        }
      }),
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
          () => new Error('An error occurred while obtaining the Pokémon list.')
        )
      )
    );
  }

  private mappedPokemon(pokemon: PokemonData): Pokemon {
    // La respuesta de los datos del pokémon incluyen más propiedades
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
      height: height / 10,
      weight: weight / 10,
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
