<template>
  <div
    class="flex items-center  justify-between rounded-tl-full rounded-bl-full px-2 gap-x-2 mb-2 hover:bg-blue-300"
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
    <div class="md:hidden">
      <button :class="`border-2 rounded-lg px-2 ${buttonClass}`" @click="toggleDetails(pokemon)">{{ buttonLabel }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { upperCaseFirstLetter, getSprite } from "../Helpers";
import { Pokemon } from "../Type";
import { ComputedRef, computed } from "vue";
defineOptions({
  name: "PokemonListOption",
});
const props = defineProps<{
  pokemon: Pokemon
}>();
const emit = defineEmits<{
  (e: "update:modelValue", toggleDetails: boolean): void;
  (e: "update:selectedPokemon"): void;
}>();

const buttonLabel: ComputedRef<string> =  computed(()=> props.pokemon?.showDetails ? 'Image': 'Details' )
const buttonClass: ComputedRef<string> = computed(()=> props.pokemon?.showDetails ? 'bg-red-400 border-red-300' : 'bg-blue-400 border-blue-300')
function changePokemon(): void{
  emit('update:selectedPokemon')
}

function toggleDetails(pokemon: Pokemon): boolean{
  return pokemon.showDetails = !pokemon.showDetails
}

</script>
