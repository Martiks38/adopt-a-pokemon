import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { PokemonDataService } from 'src/app/services';
import { storagePokemon, storagePokemons } from 'src/assets/constants';
import type { Pokemon } from 'src/app/typings/pokemon';
import { capitalize } from 'src/app/utils/capitalize';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  pokemon!: Pokemon;
  error: { state: boolean; msg: string } = { state: false, msg: '' };

  private readonly searchSvc = inject(PokemonDataService);

  constructor(private router: ActivatedRoute, private titleSrv: Title) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      const titleName = params.get('pokemon');

      if (typeof titleName === 'string') {
        this.titleSrv.setTitle(capitalize(titleName));

        const storedPokemonsList =
          window.sessionStorage.getItem(storagePokemons);
        const storedPokemon = window.sessionStorage.getItem(storagePokemon);

        if (storedPokemon) {
          const parsePokemon: Pokemon = JSON.parse(storedPokemon);

          this.pokemon = parsePokemon;
          return;
        }

        if (storedPokemonsList) {
          const parsePokemonsList: Pokemon[] = JSON.parse(storedPokemonsList);

          const indexPokemon = parsePokemonsList.findIndex(
            ({ name }) => name === titleName
          );

          if (indexPokemon !== -1) {
            this.pokemon = parsePokemonsList[indexPokemon];
          } else {
            this.getPokemon(titleName);
          }
        }
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
      .subscribe((pokemon) => (this.pokemon = pokemon));
  }
}
