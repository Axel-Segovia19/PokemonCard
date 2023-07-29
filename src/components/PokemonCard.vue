<template>
    <div class="h-full w-full">
  <div
    class="flex items-center justify-center border-2 rounded-2xl p-4 bg-yellow-400 max-w-2xl"
  >
    <div class="h-full w-full bg-purple-500">
      <div v-if="pokemon" >
        <header class="flex items-baseline justify-between mx-3.5 pt-2">
          <h1 class="text-3xl font-bold my-2">{{ pokemonName[0].toUpperCase()+pokemonName.slice(1) }}</h1>
          <div class="flex items-center">
            <h2 class="text-2xl font-semibold">130 HP</h2>
            <div class="w-8 h-8 border border-transparent ml-2 rounded-full bg-purple-400"></div>
          </div>
        </header>
        <section class="flex flex-col gap-y-2">
          <div class="border-8 mx-4 border-yellow-400 shadow-2xl flex justify-center">
            <img :src="pokemonImage" alt="Some Pokemon" />
          </div>
          <div class="bg-yellow-200 rounded w-fit self-center px-1 shadow-lg font-semibold">
                NO. {{ pokemon.id }} HT: 6'07" WT: {{ pokemon.weight }}.0 lbs.
          </div>
        </section>
      </div>
      <div v-else>
        ...loading
      </div>
    </div>
  </div>
  <button
    class="w-1/3 h-24 border-2 rounded-lg mt-2 hover:bg-slate-400 transition-colors duration-300"
    @click="getRandomPokemon"
  >
    Click ME
  </button>
</div>

</template>
<script setup lang="ts">
import { ref, onMounted, computed, ComputedRef } from "vue";
import axios from "axios";

const pokemon = ref();

const pokemonImage: ComputedRef<string> = computed(
  () => pokemon.value.sprites.other["official-artwork"]["front_default"]
);
const pokemonName: ComputedRef<string> = computed(() => pokemon.value.name);

const getRandomPokemon = async () => {
  const randomID: number = Math.floor(Math.random() * 1018) + 1;
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${randomID}`
  );
  pokemon.value = data;
  console.log(pokemon.value);
};

onMounted(() => getRandomPokemon());
const name = "PokemonCard";
defineOptions({
  name,
});
</script>
