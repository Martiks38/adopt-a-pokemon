import type { Pokemon } from 'src/app/typings';

export interface AdoptPokemonState {
  pokemonsList: { pokemon: Pokemon; amount: number }[];
  quantityPokemons: number;
  userConnection: boolean;
}
