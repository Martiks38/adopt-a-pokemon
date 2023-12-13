import type { Pokemon } from 'src/app/typings';

export interface AdoptPokemonState {
  pokemonsList: ReadonlyArray<Pokemon>;
  quantityPokemons: number;
}
