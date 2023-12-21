import type { Pokemon } from 'src/app/typings';

export interface AdoptPokemonState {
  pokemonsList: Pokemon[];
  quantityPokemons: number;
  userConnection: boolean;
}
