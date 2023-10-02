<template>
  <div class="flex flex-col md:flex-row bg-slate-200 h-screen">
    <div class="w-full flex justify-center items-center">
      <Transition name="fade" mode="out-in">
        <component
          :is="activeComponent"
          :image="pokemonImage"
          :pokemon="selectedPokemon"
        />
      </Transition>
    </div>
    <ul class="h-screen overflow-y-auto w-full p-4 md:overscroll-none">
      <li
        v-for="(pokemon, index) in pokemonStore.allPokemon"
        :key="`poke-${index}`"
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
import PokemonImageCard from "./components/PokemonImageCard.vue";
import PokemonListOption from "./components/PokemonListOption.vue";
import PokemonDetails from "./components/PokemonDetails.vue";
import { onMounted, reactive, ref, Ref, computed, ComputedRef } from "vue";
import axios from "axios";

const pokemonStore = reactive({
  allPokemon: [],
});
const selectedPokemon: Ref<any> = ref(undefined);

const showPokemonDetails = computed(() => {
  if (selectedPokemon.value) {
    return selectedPokemon.value.showDetails;
  }
});
const activeComponent: ComputedRef<
  typeof PokemonImageCard | typeof PokemonDetails
> = computed(() => (showPokemonDetails.value ? PokemonDetails : PokemonImageCard));

const pokemonImage: ComputedRef<string> = computed(() => {
  if (selectedPokemon.value) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon.value.entry_number}.png` as string;
  }
  return "";
});

async function getAllPokemon(): Promise<void> {
  const allPokemon = await axios.get(`https://pokeapi.co/api/v2/pokedex/2`);
  allPokemon.data.pokemon_entries.forEach(async (entry) => {
    const pokemonInfo = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${entry.entry_number}`
    );
    const pokemonDescription = await axios.get(entry.pokemon_species.url);
    const { genera, flavor_text_entries } = pokemonDescription.data;
    entry.pokemon_species.info = pokemonInfo.data;
    entry.showDetails = false;
    Object.assign(
      entry.pokemon_species,
      getEnglishInfo(genera),
      getEnglishInfo(flavor_text_entries)
    );
  });
  pokemonStore.allPokemon = allPokemon.data.pokemon_entries;
}

function getEnglishInfo(pokemonObject) {
  return pokemonObject.find((entry) => entry.language.name == "en");
}

function setSelectedPokemon(pokemon): void {
  selectedPokemon.value = pokemon;
}

onMounted(() => {
  getAllPokemon();
});
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
