export interface Pokemon {
  name: string,
  url: string
}

export interface PokemonIMG {
  sprites: {
    other: {
      dream_world: {
        front_default: string
      },
      home: {
        front_default: string
      }
    }
  }
}

export interface DetailPokemon {
  abilities: {
    ability: {
      name: string,
    }
  }[],
  height: number,
  moves: {
    move: {
      name: string,
    }
  }[],
  stats: {
    base_stat: number,
    stat: {
      name: string,
    }
  }[],
  types: {
    type: {
      name: string,
    }
  }[],
  weight: number,
  sprites: {
    other: {
      dream_world: {
        front_default: string
      }
    }
  }
}