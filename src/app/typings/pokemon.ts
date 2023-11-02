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

interface Pokemon {
  name: string;
  height: number;
  weight: number;
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
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

export { PokemonList, Pokemon };
