import { ActionReducerMap } from '@ngrx/store';
import { pokemonsReducer } from './adopt-pokemon/adopt-pokemon.reducer';
import { AdoptPokemonState } from './adopt-pokemon';

export interface AppState {
  pokemons: AdoptPokemonState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  pokemons: pokemonsReducer,
};
