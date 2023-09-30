export const upperCaseFirstLetter = (name: string): string => { 
  return name[0].toUpperCase() + name.substring(1);
}

export const getSprite = (pokemon): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.entry_number}.png`;
}