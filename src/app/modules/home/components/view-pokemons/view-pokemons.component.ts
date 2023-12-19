import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { PokemonDataService } from 'src/app/services';
import { SearchPokemonComponent } from '../search-pokemon';
import {
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
  pokemons!: Pokemon[];
  navigationButtonLinks: PageLinks = {
    previous: false,
    next: false,
    offset: 0,
  };
  errorMessage: string | null = null;

  constructor(private pokemonSvc: PokemonDataService) {}

  ngOnInit(): void {
    this.pokemonSvc.currentPage$.subscribe(() => {
      const cachePokemonsList =
        window.localStorage.getItem(storagePokemonsList);
      const cacheNavigationPageLinks = window.localStorage.getItem(
        storageNavigationPageLinks
      );

      if (!cachePokemonsList || !cacheNavigationPageLinks) {
        this.loadPokemons();
        return;
      }

      const parseCachePokemonsList: Pokemon[] = JSON.parse(cachePokemonsList);
      const parseCacheNavigationPageLinks: PageLinks = JSON.parse(
        cacheNavigationPageLinks
      );

      const checkParseCachePokemons =
        Array.isArray(parseCachePokemonsList) &&
        parseCachePokemonsList.length !== 0;

      const checkPrseCacheNavigationPageLinks =
        typeof parseCacheNavigationPageLinks.previous === 'boolean' &&
        typeof parseCacheNavigationPageLinks.next === 'boolean' &&
        typeof parseCacheNavigationPageLinks.offset === 'number';

      if (!checkParseCachePokemons || !checkPrseCacheNavigationPageLinks) {
        this.loadPokemons();
        return;
      }

      this.pokemons = parseCachePokemonsList;

      const { next, previous, offset } =
        this.pokemonSvc.getNavigationPageLinks();
      const checkNavigationPageLinks =
        parseCacheNavigationPageLinks.next !== next ||
        parseCacheNavigationPageLinks.previous !== previous ||
        parseCacheNavigationPageLinks.offset !== offset;

      if (checkNavigationPageLinks) {
        this.pokemonSvc.setNavigationPageLinks(parseCacheNavigationPageLinks);
      }
    });
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
        const navigationPageLinks = this.pokemonSvc.getNavigationPageLinks();

        const strPokemonsList = JSON.stringify(data);
        const strNavigationPageLinks = JSON.stringify(navigationPageLinks);

        window.localStorage.setItem(storagePokemonsList, strPokemonsList);
        window.localStorage.setItem(
          storageNavigationPageLinks,
          strNavigationPageLinks
        );

        this.pokemons = data;
      });
  }
}
