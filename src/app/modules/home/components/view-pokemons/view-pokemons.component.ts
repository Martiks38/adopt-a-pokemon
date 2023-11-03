import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Subject, catchError, throwError } from 'rxjs';

import { PokemonDataService } from 'src/app/services';
import { LoaderComponent } from 'src/app/shared';
import { PokemonItemComponent } from '../pokemon-item';

import type { Pokemon } from 'src/app/typings/pokemon';

@Component({
  selector: 'app-view-pokemons',
  templateUrl: './view-pokemons.component.html',
  styleUrls: ['./view-pokemons.component.scss'],
  imports: [CommonModule, PokemonItemComponent, LoaderComponent],
  standalone: true,
})
export class ViewPokemonsComponent implements OnInit {
  searchPokemon$ = new Subject<Pokemon>();
  pokemons!: Pokemon[];
  errorMessage: string | null = null;

  private searchSvc = inject(PokemonDataService);

  constructor() {}

  ngOnInit(): void {
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
        this.pokemons = data;
      });
  }
}
