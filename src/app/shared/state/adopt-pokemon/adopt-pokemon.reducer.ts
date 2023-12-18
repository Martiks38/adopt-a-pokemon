import { createReducer, on } from '@ngrx/store';
import { addPokemon, changeUserConnection } from './adopt-pokemon.actions';
import { storagePokemonState } from 'src/assets/constants';
import type { AdoptPokemonState } from './adopt-pokemon.model';

const initialStatePokemon = window.localStorage.getItem(storagePokemonState);
const parseInitialStatePokemon: AdoptPokemonState = initialStatePokemon
  ? JSON.parse(initialStatePokemon)
  : {
      pokemonsList: [],
      quantityPokemons: 0,
      userConnection: false,
    };

export const initialState: AdoptPokemonState = parseInitialStatePokemon;

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
  }),
  on(changeUserConnection, (state) => {
    const newState = { ...state, userConnection: !state.userConnection };

    window.localStorage.setItem(storagePokemonState, JSON.stringify(newState));

    return newState;
  })
);
