export type Pokemon = {
  entry_number: number
  showDetails: boolean
  pokemon_species: PokemonSpecies
}

export type PokemonSpecies = {
  flavor_text: string
  genus: string
  name: string
  info: PokemonInfo
  url: string
}

export type PokemonInfo = {
  weight: number
  height: number
  types: PokemonType[]
}

export type PokemonType = {
  type: {
    name: string
  }
}

export type PokemonText = {
  genera?: string 
  flavor_text?: string
  language :{
    name: string
  } 
}

