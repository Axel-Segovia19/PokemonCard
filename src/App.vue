<template>
  <div class="flex flex-col md:flex-row bg-slate-200 h-screen">
    <div v-if="pokemonStore.selectedPokemon" class="w-full flex flex-col justify-center items-center">
      <template class="flex md:hidden items-center">
        <pokemon-mobile-view :pokemon-image="pokemonStore.pokemonImage" :selected-pokemon="pokemonStore.selectedPokemon"/>
      </template>
      <template class="hidden md:flex md:flex-col items-center ">
        
        <pokemon-desktop-view  :pokemon-image="pokemonStore.pokemonImage" :selected-pokemon="pokemonStore.selectedPokemon"/>
      </template>
    </div>
    <ul class="h-screen overflow-y-auto w-full p-4 md:overscroll-none">
      <li
        v-for="(pokemon, index) in pokemonStore.allPokemon"
        :key="`poke-${index}`"
        :class="{'bg-red-300 rounded-tl-full rounded-bl-full': pokemonStore.selectedPokemon == pokemon}"
      >
        <pokemon-list-option
          :pokemon="pokemon"
          @update:selected-pokemon="setSelectedPokemon(pokemon)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import PokemonListOption from "./components/PokemonListOption.vue";
import PokemonMobileView from "./components/PokemonMobileView.vue";
import PokemonDesktopView from "./components/PokemonDesktopView.vue";
import { Pokemon, PokemonText } from  './Type'
import { onMounted, reactive, ref, computed } from "vue";
import axios from "axios";

const pokemonStore = reactive({
  allPokemon: ref<Pokemon[]>([]),
  selectedPokemon: ref<Pokemon>(),
  pokemonImage: computed((): string => {
    if(!pokemonStore.selectedPokemon?.entry_number) return ''
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonStore.selectedPokemon?.entry_number}.png`}),
});



async function fetchPokemonData(entry: Pokemon): Promise<Pokemon> {
  const [pokemonInfo, pokemonDescription] = await Promise.all([
    axios.get(`https://pokeapi.co/api/v2/pokemon/${entry.entry_number}`),
    axios.get(entry.pokemon_species.url)
  ]);

  const { genera, flavor_text_entries } = pokemonDescription.data;
  entry.pokemon_species.info = pokemonInfo.data;
  entry.showDetails = false;
  Object.assign(
    entry.pokemon_species,
    getEnglishInfo(genera),
    getEnglishInfo(flavor_text_entries)
  );
  return entry
}

async function getAllPokemon(): Promise<void> {
  const allPokemon = await axios.get(`https://pokeapi.co/api/v2/pokedex/2`);

  const allPokemonResponse: Pokemon[] = await Promise.all(allPokemon.data.pokemon_entries.map(fetchPokemonData));
  pokemonStore.allPokemon = allPokemonResponse
}

function getEnglishInfo(pokemon: PokemonText[]): PokemonText| undefined {
  return pokemon.find((entry: PokemonText) => entry.language.name == "en");
}

function setSelectedPokemon(pokemon: Pokemon): void {
  pokemonStore.selectedPokemon = pokemon;
}

async function setup(){
  await getAllPokemon();
  pokemonStore.selectedPokemon = pokemonStore.allPokemon[0]
}

onMounted(async () => {
  await setup()
});
</script>