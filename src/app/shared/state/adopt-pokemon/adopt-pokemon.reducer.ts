import { createReducer, on } from '@ngrx/store';
import {
  addPokemon,
  changeUserConnection,
  clearPokemonsList,
  removePokemon,
} from './adopt-pokemon.actions';
import { storagePokemonState } from 'src/assets/constants';
import type { AdoptPokemonState } from './adopt-pokemon.model';
import type { Pokemon } from 'src/app/typings';

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
    let newState = structuredClone(state);
    const pokemonsListClone = newState.pokemonsList;

    const indPokemon = pokemonsListClone.findIndex(
      (p) => p.pokemon.name === pokemon.name
    );

    if (indPokemon !== -1) {
      const pokemonCpy = structuredClone(pokemonsListClone[indPokemon]);

      pokemonCpy.amount += 1;

      pokemonsListClone[indPokemon] = pokemonCpy;
    } else {
      pokemonsListClone.push({ pokemon, amount: 1 });
    }

    const quantityPokemons = pokemonsListClone.reduce((total, pokemon) => {
      return total + pokemon.amount;
    }, 0);

    newState = {
      ...newState,
      pokemonsList: pokemonsListClone,
      quantityPokemons,
    };

    window.localStorage.setItem(storagePokemonState, JSON.stringify(newState));

    return newState;
  }),
  on(removePokemon, (state, { pokemon }) => {
    let pokemonsListClone = structuredClone(state.pokemonsList);
    let newState = structuredClone(state);

    const indPokemon = pokemonsListClone.findIndex(
      (p) => p.pokemon.name === pokemon.name
    );

    if (indPokemon !== -1) {
      const pokemonCpy = structuredClone(pokemonsListClone[indPokemon]);

      if (pokemonCpy.amount === 1) {
        pokemonsListClone = pokemonsListClone.filter(
          (p) => p.pokemon.name !== pokemonCpy.pokemon.name
        );
      } else {
        pokemonCpy.amount -= 1;

        pokemonsListClone[indPokemon] = pokemonCpy;
      }
    } else {
      pokemonsListClone.push({ pokemon, amount: 1 });
    }

    const quantityPokemons = pokemonsListClone.reduce((total, pokemon) => {
      return total + pokemon.amount;
    }, 0);

    newState = {
      ...newState,
      pokemonsList: pokemonsListClone,
      quantityPokemons,
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
