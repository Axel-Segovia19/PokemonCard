<template>
  <div class="flex flex-col md:flex-row bg-slate-200">
    <div class="w-full flex justify-center items-center">
      <pokemon-card class="mr-4" :image="pokemonImage" />
    </div>
    <ul class="h-screen overflow-y-auto w-full md:overscroll-none p-4">
      <li
        v-for="(pokemon, index) in pokemonStore.allPokemon"
        :key="`poke-${index}`"
        @mouseover="setSelectedPokemon(pokemon)"
      >
        <div
          class="flex items-center rounded-tl-full rounded-bl-full pl-2 gap-x-2 mt-2 hover:bg-blue-300"
        >
          <span>
            <img
              class="w-12 h-12"
              :src="getListSprite(pokemon)"
              alt="pokemonSprite"
            />
          </span>
          <span>
            No.{{ pokemon.entry_number }}
            {{ getPokemonName(pokemon.pokemon_species.name) }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import PokemonCard from "./components/PokemonCard.vue";
import { onMounted, reactive, ref, Ref, computed, ComputedRef } from "vue";
import axios from "axios";

const selectedPokemon: Ref<string | undefined> = ref(undefined);
const pokemonStore = reactive({
  allPokemon: [],
});

const pokemonImage: ComputedRef<string> = computed(() => {
  if (selectedPokemon.value) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon.value.entry_number}.png` as string;
  }
  return "";
});

async function getAllPokemon(): Promise<void> {
  const allPokemon = await axios.get(`https://pokeapi.co/api/v2/pokedex/2`);
  allPokemon.data.pokemon_entries.forEach(async (entry) => {
    const speciesData = await axios.get(entry.pokemon_species.url);
    entry.pokemon_species.info = speciesData.data;
  });
  pokemonStore.allPokemon = allPokemon.data.pokemon_entries;
}

function getPokemonName(name: string): string {
  return name[0].toUpperCase() + name.substring(1);
}

function setSelectedPokemon(pokemon): void {
  selectedPokemon.value = pokemon;
}

function getListSprite(pokemonEntry: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonEntry.entry_number}.png`;
}

onMounted(() => {
  getAllPokemon();
});
</script>
