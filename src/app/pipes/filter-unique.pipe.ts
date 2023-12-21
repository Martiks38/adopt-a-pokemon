import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../typings';

@Pipe({
  name: 'filterUnique',
})
export class FilterUniquePipe implements PipeTransform {
  transform(value: Pokemon[] | null): { pokemon: Pokemon; amount: number }[] {
    if (!value) return [];

    return value.reduce(
      (pokemons: { pokemon: Pokemon; amount: number }[], pokemon: Pokemon) => {
        const indPokemon = pokemons.findIndex(
          (p) => p.pokemon.name === pokemon.name
        );

        if (indPokemon !== -1) {
          const pokemonCpy = structuredClone(pokemons[indPokemon]);

          pokemonCpy.amount += 1;

          pokemons[indPokemon] = pokemonCpy;

          return pokemons;
        }

        return [...pokemons, { pokemon, amount: 1 }];
      },
      []
    );
  }
}
