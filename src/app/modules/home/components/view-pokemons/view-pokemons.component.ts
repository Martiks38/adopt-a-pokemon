import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

import { PokemonDataService } from 'src/app/services';
import { SearchPokemonComponent } from '../search-pokemon';
import {
  getLimitPokemons,
  storageNavigationPageLinks,
  storagePokemonsList,
} from 'src/assets/constants';
import { PokemonListComponent } from '../pokemon-list';
import { PanelPaginationComponent } from '../panel-pagination';
import type { PageLinks, Pokemon } from 'src/app/typings';

@Component({
  selector: 'app-view-pokemons',
  templateUrl: './view-pokemons.component.html',
  styleUrls: ['./view-pokemons.component.scss'],
  imports: [
    CommonModule,
    SearchPokemonComponent,
    PokemonListComponent,
    PanelPaginationComponent,
  ],
  standalone: true,
})
export class ViewPokemonsComponent implements OnInit {
  pokemons: Pokemon[] = [];
  errorMessage: string | null = null;

  constructor(private pokemonSvc: PokemonDataService) {}

  ngOnInit(): void {
    this.pokemonSvc.navigation$
      .pipe(
        tap(() => {
          const cachePokemonsList =
            window.localStorage.getItem(storagePokemonsList);
          const cacheNavigationPage = window.localStorage.getItem(
            storageNavigationPageLinks
          );

          if (!cachePokemonsList || !cacheNavigationPage) {
            this.loadPokemons();
            return;
          }

          const parseCachePokemonsList: Pokemon[] =
            JSON.parse(cachePokemonsList);
          const parseCacheNavigationPage: PageLinks =
            JSON.parse(cacheNavigationPage);

          const checkParseCachePokemons =
            Array.isArray(parseCachePokemonsList) &&
            parseCachePokemonsList.length !== getLimitPokemons;

          const checkParseCacheNavigationPageLinks =
            typeof parseCacheNavigationPage.previous === 'boolean' &&
            typeof parseCacheNavigationPage.next === 'boolean' &&
            typeof parseCacheNavigationPage.offset === 'number' &&
            typeof parseCacheNavigationPage.totalPages === 'number';

          if (!checkParseCachePokemons || !checkParseCacheNavigationPageLinks) {
            this.loadPokemons();
            return;
          }

          this.pokemons = parseCachePokemonsList;

          let next: boolean = false;
          let previous: boolean = false;
          let offset: number = 0;

          const checkNavigationPageLinks =
            parseCacheNavigationPage.next !== next ||
            parseCacheNavigationPage.previous !== previous ||
            parseCacheNavigationPage.offset !== offset;

          if (checkNavigationPageLinks) {
            this.pokemonSvc.setNavigationPageLinks(parseCacheNavigationPage);
          }
        })
      )
      .subscribe();
  }

  private loadPokemons() {
    this.pokemonSvc
      .getAllPokemons()
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
        const strPokemonsList = JSON.stringify(data);

        window.localStorage.setItem(storagePokemonsList, strPokemonsList);

        this.pokemons = data;
      });
  }
}
