import { createReducer, on } from '@ngrx/store';
import { addPokemon } from './adopt-pokemon.actions';
import { storagePokemonState } from 'src/assets/constants';
import type { Pokemon } from 'src/app/typings';
import type { AdoptPokemonState } from './adopt-pokemon.model';

interface InitialState {
  pokemonsList: ReadonlyArray<Pokemon>;
  quantityPokemons: number;
}

const initialStatePokemon = window.localStorage.getItem(storagePokemonState);
const parseInitialStatePokemon: AdoptPokemonState = initialStatePokemon
  ? JSON.parse(initialStatePokemon)
  : {
      pokemonsList: [],
      quantityPokemons: 0,
    };

export const initialState: InitialState = parseInitialStatePokemon;

export const pokemonsReducer = createReducer(
  initialState,
  on(addPokemon, (state, { pokemon }) => {
    const pokemonsListClone = structuredClone(state.pokemonsList);
    const updatePokemonsList = [...pokemonsListClone, pokemon];

    const newState = {
      ...state,
      pokemonsList: updatePokemonsList,
      quantityPokemons: updatePokemonsList.length,
    };

    window.localStorage.setItem(storagePokemonState, JSON.stringify(newState));

    return newState;
  })
  // on(retrievedPokemonsList, (state, { pokemons }) => state.concat(pokemons))
);
