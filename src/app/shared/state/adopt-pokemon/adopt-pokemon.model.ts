import type { Pokemon, UserInformation } from 'src/app/typings';

export interface AdoptPokemonState {
  pokemonsList: ReadonlyArray<Pokemon>;
  quantityPokemons: number;
  user: null | UserInformation;
}
