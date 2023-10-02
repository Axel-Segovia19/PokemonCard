<template>
  <div class="w-full max-h-96 h-[475px] p-2">
    <div class="flex justify-evenly items-center">
      <img :src="getSprite(pokemon)" class="w-12 h-12" />
      <div>No. {{ pokemon?.entry_number }}</div>
      <span>
        {{ upperCaseFirstLetter(pokemon?.pokemon_species.name) }}
      </span>
    </div>
    <div class="bg-slate-300 p-2 text-center">{{ pokemon?.pokemon_species.genus }}</div>
    <div class="p-2 grid grid-cols-3 text-center">
      <span>Type</span>
      <span v-for="type, index in PokemonTypes" :key="index">{{ upperCaseFirstLetter(type) }}</span>
    </div>
    <div class="grid grid-cols-3 text-center p-2">
      <span>Height</span>
      <span>{{ pokemon?.pokemon_species.info.height }}"</span>
    </div>
    <div class="grid grid-cols-3 text-center p-2">
      <span>Weight</span>
      <span>{{ pokemon?.pokemon_species.info.weight }} lbs.</span>
    </div>
    <div class="p-6">
      {{ pokemon?.pokemon_species.flavor_text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { upperCaseFirstLetter, getSprite } from "../Helpers";
import { computed } from "vue";

defineOptions({
  name: "PokemonDetails",
});

const props = defineProps({
  pokemon: {
    type: Object,
  },
});
const PokemonTypes = computed(()=> props.pokemon?.pokemon_species.info.types.map((types)=> types.type.name))
</script>
