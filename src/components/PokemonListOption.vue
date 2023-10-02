<template>
  <div
    class="flex items-center  justify-between rounded-tl-full rounded-bl-full px-2 gap-x-2 mt-2 hover:bg-blue-300"
  >
    <div class="flex items-center w-full" @click="changePokemon">
      <span>
        <img class="w-12 h-12" :src="getSprite(pokemon)" alt="pokemonSprite" />
      </span>
      <span>
        No.{{ pokemon?.entry_number }}
        {{ upperCaseFirstLetter(pokemon?.pokemon_species.name) }}
      </span>
    </div>
    <div>
      <button @click="pokemon!.showDetails = !pokemon?.showDetails">{{ pokemon?.showDetails ? 'Show Details' : 'Show Image'}}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { upperCaseFirstLetter, getSprite } from "../Helpers";

defineOptions({
  name: "PokemonListOption",
});
defineProps({
  pokemon: {
    type: Object,
  },
});
const emit = defineEmits<{
  (e: "update:modelValue", toggleDetails: boolean): void;
  (e: "update:selectedPokemon"): void;
}>();

function changePokemon(){
  emit('update:selectedPokemon')
}

</script>
