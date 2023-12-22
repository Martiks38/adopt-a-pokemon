import { createReducer, on } from '@ngrx/store';
import {
  addPokemon,
  changeUserConnection,
  clearPokemonsList,
  removePokemon,
} from './adopt-pokemon.actions';
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
  on(removePokemon, (state, { pokemon }) => {
    const pokemonsListClone = structuredClone(state.pokemonsList);

    const indPokemon = pokemonsListClone.findIndex(
      (p) => p.name === pokemon.name
    );

    if (indPokemon === -1) {
      return state;
    }

    pokemonsListClone.splice(indPokemon, 1);

    const newState = {
      ...state,
      pokemonsList: pokemonsListClone,
      quantityPokemons: pokemonsListClone.length,
    };

    window.localStorage.setItem(storagePokemonState, JSON.stringify(newState));

    return newState;
  }),
  on(clearPokemonsList, (state) => {
    const cpyState = structuredClone(state);

    cpyState.pokemonsList = [];
    cpyState.quantityPokemons = 0;

    window.localStorage.setItem(storagePokemonState, JSON.stringify(cpyState));

    return cpyState;
  }),
  on(changeUserConnection, (state) => {
    const newState = { ...state, userConnection: !state.userConnection };

    window.localStorage.setItem(storagePokemonState, JSON.stringify(newState));

    return newState;
  })
);
