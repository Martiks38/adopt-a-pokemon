import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import {
  clearPokemonsList,
  removePokemon,
  selectPokemonsList,
} from 'src/app/shared/state';
import { Pokemon } from 'src/app/typings';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  adoptedPokemons$ = this.store.select(selectPokemonsList);

  constructor(
    private readonly titleSrv: Title,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.titleSrv.setTitle('Pokemon list');
  }

  clearList() {
    this.store.dispatch(clearPokemonsList());
  }

  removePokemonToAdoptionList(pokemon: Pokemon) {
    this.store.dispatch(removePokemon({ pokemon }));
  }
}
