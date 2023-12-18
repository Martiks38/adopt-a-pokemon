import { createAction, props } from '@ngrx/store';
import type { Pokemon } from 'src/app/typings';

export const addPokemon = createAction(
  '[Pokemons Adopted] Add Pokemon',
  props<{ pokemon: Pokemon }>()
);

export const changeUserConnection = createAction(
  '[Connection User] Change User Connection',
  props<{ connection: Boolean }>
);

export const retrievedPokemonsList = createAction(
  '[Pokemons List] Retrieve Pokemons Success',
  props<{ pokemons: ReadonlyArray<Pokemon> }>()
);
