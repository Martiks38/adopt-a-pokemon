import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Store } from '@ngrx/store';

import { PokemonDataService } from 'src/app/services';
import { storagePokemon } from 'src/assets/constants';
import { capitalize } from 'src/app/utils/capitalize';
import { addPokemon } from 'src/app/shared/state/adopt-pokemon/adopt-pokemon.actions';

import type { Pokemon } from 'src/app/typings';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  pokemon!: Pokemon;
  error: { state: boolean; msg: string } = { state: false, msg: '' };

  private readonly searchSvc = inject(PokemonDataService);

  constructor(
    private router: ActivatedRoute,
    private titleSrv: Title,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      const titleName = params.get('pokemon');

      if (typeof titleName === 'string') {
        this.titleSrv.setTitle(capitalize(titleName));

        const storedPokemon = window.localStorage.getItem(storagePokemon);

        if (!storedPokemon) {
          this.getPokemon(titleName);
          return;
        }

        const parsePokemon: Pokemon = JSON.parse(storedPokemon);

        this.pokemon = parsePokemon;
      } else {
        this.error = { state: true, msg: `${titleName} doesn't exist.` };
      }
    });
  }

  private getPokemon(name: string): void {
    this.searchSvc
      .getPokemon(name)
      .pipe(
        catchError((err: any) => {
          if (err instanceof Error) {
            this.error = { state: true, msg: err.message };
          } else {
            this.error = {
              state: true,
              msg: 'An error occurred while obtaining the Pokémon list.',
            };
          }
          return throwError(
            () => 'An error occurred while obtaining the Pokémon list.'
          );
        })
      )
      .subscribe((pokemon) => {
        this.pokemon = pokemon;

        window.localStorage.setItem(storagePokemon, JSON.stringify(pokemon));
      });
  }

  addPokemonToAdoptionList() {
    this.store.dispatch(addPokemon({ pokemon: this.pokemon }));
  }
}
