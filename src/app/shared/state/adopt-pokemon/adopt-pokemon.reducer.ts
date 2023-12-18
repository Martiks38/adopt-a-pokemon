import { createReducer, on } from '@ngrx/store';
import { addPokemon } from './adopt-pokemon.actions';
import { storagePokemonState, storageUser } from 'src/assets/constants';
import type { Pokemon, UserInformation } from 'src/app/typings';
import type { AdoptPokemonState } from './adopt-pokemon.model';

const initialStatePokemon = window.localStorage.getItem(storagePokemonState);
const initialStatePokemonUser = window.localStorage.getItem(storageUser);
const userData: UserInformation = initialStatePokemonUser
  ? JSON.parse(initialStatePokemonUser)
  : null;
const parseInitialStatePokemon: AdoptPokemonState = initialStatePokemon
  ? JSON.parse(initialStatePokemon)
  : {
      pokemonsList: [],
      quantityPokemons: 0,
      user: userData,
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
  })
  // on(retrievedPokemonsList, (state, { pokemons }) => state.concat(pokemons))
);
