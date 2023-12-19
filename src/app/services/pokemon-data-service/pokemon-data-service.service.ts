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
import { PageLinks } from 'src/app/typings';

@Injectable({
  providedIn: 'root',
})
export class PokemonDataService {
  private baseUrl = environment.baseUrl;
  private pageLinks: PageLinks = { previous: false, next: false, offset: 0 };

  private offset = 0;
  private currentPageSubject = new BehaviorSubject<number>(0);
  public currentPage$ = this.currentPageSubject.asObservable();

  private totalPages = 0;
  private totalPagesSubject = new BehaviorSubject(0);
  public totalPages$ = this.totalPagesSubject.asObservable();

  private readonly http = inject(HttpClient);

  getNavigationPageLinks(): PageLinks {
    return this.pageLinks;
  }

  getOffset() {
    return this.offset;
  }

  setNavigationPageLinks(pageLinks: PageLinks) {
    this.pageLinks = pageLinks;

    this.currentPageSubject.next(pageLinks.offset);
  }

  setCurrentPageSubjectNext() {
    const numberNextPage = this.offset + 1;

    this.offset = numberNextPage;

    this.currentPageSubject.next(numberNextPage);
  }

  setCurrentPageSubjectPrevious() {
    const numberPrevNextPage = this.offset - 1;

    this.offset = numberPrevNextPage;

    this.currentPageSubject.next(numberPrevNextPage);
  }

  setCurrentPage(pageNumber: number) {
    const currentPage = pageNumber - 1;

    this.offset = currentPage;
    this.currentPageSubject.next(currentPage);
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
      this.offset * getLimitPokemons
    }`;

    return this.http.get<FetchAllPokemonsResponse>(url).pipe(
      retry(1),
      tap((resApi) => {
        this.pageLinks = {
          previous: Boolean(resApi.previous),
          next: Boolean(resApi.next),
          offset: this.offset,
        };

        if (this.totalPages === 0) {
          const pageNumber = Math.ceil(resApi.count / getLimitPokemons);

          this.totalPages = pageNumber;

          this.totalPagesSubject.next(pageNumber);
        }

        return resApi;
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
}
