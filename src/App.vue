<template>
  <div class="h-screen overflow-hidden">
    <pokemon-navbar v-model:searchBar="navBarInputs.filterText" v-model:selectedRegion="navBarInputs.pokedexRegion"/>
    <div class="flex flex-col md:flex-row bg-slate-200 h-screen">
      <div
      v-if="pokemonStore.selectedPokemon"
      class="w-full flex flex-col justify-center items-center"
      >
      <template class="flex md:hidden items-center">
        <pokemon-mobile-view
        :pokemon-image="pokemonStore.pokemonImage"
        :selected-pokemon="pokemonStore.selectedPokemon"
        />
      </template>
      <template class="hidden md:flex md:flex-col items-center">
        <pokemon-desktop-view
        :pokemon-image="pokemonStore.pokemonImage"
        :selected-pokemon="pokemonStore.selectedPokemon"
        />
      </template>
    </div>
    <ul
    class="h-screen overflow-y-auto w-full p-4 md:overscroll-none pb-20 overflow-hidden overscroll-none"
      >
        <li
          v-for="(pokemon, index) in pokemonStore.filteredPokemon"
          :key="`poke-${index}`"
          :class="{
            'bg-red-300 rounded-tl-full rounded-bl-full':
              pokemonStore.selectedPokemon == pokemon,
          }"
        >
          <pokemon-list-option
            :pokemon="pokemon"
            @update:selected-pokemon="setSelectedPokemon(pokemon)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import PokemonListOption from "./components/PokemonListOption.vue";
import PokemonMobileView from "./components/PokemonMobileView.vue";
import PokemonDesktopView from "./components/PokemonDesktopView.vue";
import PokemonNavbar from "./components/PokemonNavbar.vue";
import { Pokemon, PokemonText } from "./Type";
import { onMounted, reactive, ref, computed, watch } from "vue";
import axios from "axios";

const navBarInputs = reactive({
  filterText: ref<string>(''),
  pokedexRegion: ref<string>('2')
})
const pokemonStore = reactive({
  allPokemon: ref<Pokemon[]>([]),
  selectedPokemon: ref<Pokemon>(),
  pokemonImage: computed((): string => {
    if (!pokemonStore.selectedPokemon?.entry_number) return "";
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonStore.selectedPokemon?.id}.png`;
  }),
  filteredPokemon: computed((): Pokemon[] => pokemonStore.allPokemon.filter((pokemon: Pokemon)=> pokemon.pokemon_species.name.includes(navBarInputs.filterText.toLowerCase())))
});


async function fetchPokemonData(entry: Pokemon): Promise<Pokemon> {
  const pokemonDescription = await axios.get(entry.pokemon_species.url)
  const { genera, flavor_text_entries } = pokemonDescription.data;
  entry.id = pokemonDescription.data.id
  entry.showDetails = false;
  
  const pokemonInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${entry.id}`)
  entry.pokemon_species.info = pokemonInfo.data;
  Object.assign(
    entry.pokemon_species,
    getEnglishInfo(genera),
    getEnglishInfo(flavor_text_entries)
    );
  return entry;
}

async function getAllPokemon(): Promise<void> {
  const allPokemon = await axios.get(`https://pokeapi.co/api/v2/pokedex/${navBarInputs.pokedexRegion}`);
  const allPokemonResponse: Pokemon[] = await Promise.all(
    allPokemon.data.pokemon_entries.map(fetchPokemonData)
  );
  pokemonStore.allPokemon = allPokemonResponse;
  console.log(pokemonStore.allPokemon)
}

function getEnglishInfo(pokemon: PokemonText[]): PokemonText | undefined {
  return pokemon.find((entry: PokemonText) => entry.language.name == "en");
}

function setSelectedPokemon(pokemon: Pokemon): void {
  pokemonStore.selectedPokemon = pokemon;
}

async function setup() {
  await getAllPokemon();
  pokemonStore.selectedPokemon = pokemonStore.allPokemon[0];
}

onMounted(async () => {
  await setup();
});

watch(()=>navBarInputs.pokedexRegion, async() => await setup())
</script>
