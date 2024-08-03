interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface Cry {
  latest: string;
  legacy: string;
}

interface Form {
  name: string;
  url: string;
}

interface GameIndex {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

interface MoveLearnMethod {
  name: string;
  url: string;
}

interface VersionGroup {
  name: string;
  url: string;
}

interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  version_group: VersionGroup;
}

interface Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: VersionGroupDetail[];
}

interface Species {
  name: string;
  url: string;
}

interface Sprite {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

interface OtherSprites {
  dream_world: Sprite;
  home: Sprite;
  "official-artwork": Sprite;
  showdown: Sprite;
}

interface GenerationSprites {
  "red-blue": Sprite;
  yellow: Sprite;
}

interface GenerationIISprites {
  crystal: Sprite;
  gold: Sprite;
  silver: Sprite;
}

interface GenerationIIISprites {
  emerald: Sprite;
  "firered-leafgreen": Sprite;
  "ruby-sapphire": Sprite;
}

interface GenerationIVSprites {
  "diamond-pearl": Sprite;
  "heartgold-soulsilver": Sprite;
  platinum: Sprite;
}

interface GenerationVSprites {
  animated: Sprite;
  "black-white": Sprite;
}

interface GenerationVISprites {
  "omegaruby-alphasapphire": Sprite;
  "x-y": Sprite;
}

interface GenerationVIISprites {
  icons: Sprite;
  "ultra-sun-ultra-moon": Sprite;
}

interface Versions {
  "generation-i": GenerationSprites;
  "generation-ii": GenerationIISprites;
  "generation-iii": GenerationIIISprites;
  "generation-iv": GenerationIVSprites;
  "generation-v": GenerationVSprites;
  "generation-vi": GenerationVISprites;
  "generation-vii": GenerationVIISprites;
}

interface Sprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: OtherSprites;
  versions: Versions;
}

interface ITypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface IStats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface IPokemon {
  abilities: Ability[];
  base_experience: number;
  cries: Cry;
  forms: Form[];
  game_indices: GameIndex[];
  height: number;
  weight: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: any[];
  past_types: any[];
  species: Species;
  sprites: Sprites;
  types: ITypes[];
  stats: IStats[];
}
