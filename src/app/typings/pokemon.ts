interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonURL[];
}

interface PokemonURL {
  name: string;
  url: string;
}

interface MainPokemonData {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: {
      dreamWorld: {
        front_default: string | null;
        front_female: string | null;
      };
      home: {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
    };
  };
}

interface Pokemon extends MainPokemonData {
  types: string[];
}

interface PokemonData extends MainPokemonData {
  types: {
    slot: number;
    type: { name: string; url: string };
  }[];
}

export { PokemonList, Pokemon, PokemonData };
