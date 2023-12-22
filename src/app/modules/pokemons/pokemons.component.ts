import { Component } from '@angular/core';
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
export class PokemonsComponent {
  adoptedPokemons$ = this.store.select(selectPokemonsList);

  constructor(private readonly store: Store) {}

  clearList() {
    this.store.dispatch(clearPokemonsList());
  }

  removePokemonToAdoptionList(pokemon: Pokemon) {
    this.store.dispatch(removePokemon({ pokemon }));
  }
}
