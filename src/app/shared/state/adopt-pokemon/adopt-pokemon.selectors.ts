import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdoptPokemonState } from './adopt-pokemon.model';

export const selectPokemonsState =
  createFeatureSelector<AdoptPokemonState>('pokemons');

export const selectPokemonsList = createSelector(
  selectPokemonsState,
  (state: AdoptPokemonState) => state.pokemonsList
);

export const selectQuantityPokemons = createSelector(
  selectPokemonsState,
  (state: AdoptPokemonState) => state.quantityPokemons
);

export const selectGetUserPokemons = createSelector(
  selectPokemonsState,
  (state: AdoptPokemonState) => state.userConnection
);
