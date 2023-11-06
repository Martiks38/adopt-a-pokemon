import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Subject, catchError, throwError } from 'rxjs';

import { PokemonDataService } from 'src/app/services';
import { SearchPokemonComponent } from '../search-pokemon';
import { storagePokemons } from 'src/assets/constants';
import { PokemonListComponent } from '../pokemon-list';
import type { Pokemon } from 'src/app/typings/pokemon';

@Component({
  selector: 'app-view-pokemons',
  templateUrl: './view-pokemons.component.html',
  styleUrls: ['./view-pokemons.component.scss'],
  imports: [CommonModule, SearchPokemonComponent, PokemonListComponent],
  standalone: true,
})
export class ViewPokemonsComponent implements OnInit {
  searchPokemon$ = new Subject<Pokemon>();
  pokemons!: Pokemon[];
  errorMessage: string | null = null;

  private searchSvc = inject(PokemonDataService);

  constructor() {}

  ngOnInit(): void {
    const cachePokemons = window.sessionStorage.getItem(storagePokemons);

    if (cachePokemons) {
      const parseCachePokemons: Pokemon[] = JSON.parse(cachePokemons);
      const checkParseCachePokemons =
        Array.isArray(parseCachePokemons) && parseCachePokemons.length !== 0;

      if (checkParseCachePokemons) {
        this.pokemons = parseCachePokemons;
      } else {
        this.getPokemons();
      }
    } else {
      this.getPokemons();
    }
  }

  private getPokemons(): void {
    this.searchSvc
      .getPokemons()
      .pipe(
        catchError((err: any) => {
          if (err instanceof Error) {
            this.errorMessage = err.message;
          } else {
            this.errorMessage =
              'An error occurred while obtaining the Pokémon list.';
          }
          return throwError(
            () => 'An error occurred while obtaining the Pokémon list.'
          );
        })
      )
      .subscribe((data) => {
        const strPokemons = JSON.stringify(data);
        window.sessionStorage.setItem(storagePokemons, strPokemons);

        this.pokemons = data;
      });
  }
}
