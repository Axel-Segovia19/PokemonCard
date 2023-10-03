<template>
  <Transition name="fade" mode="out-in">
        <component
          :is="activeComponent"
          :image="pokemonImage"
          :pokemon="selectedPokemon"
        />
      </Transition>
</template>
<script setup lang="ts">
import PokemonImageCard from './PokemonImageCard.vue';
import PokemonDetails from './PokemonDetails.vue';
import { ComputedRef, computed } from 'vue';
import { Pokemon } from '../Type';

const props = defineProps<{
pokemonImage: string
selectedPokemon: Pokemon
}>()

const showPokemonDetails: ComputedRef<boolean> = computed(() => {
    return props.selectedPokemon?.showDetails ?? false
  
});

const activeComponent: ComputedRef<
  typeof PokemonImageCard | typeof PokemonDetails
> = computed(() => (showPokemonDetails.value ? PokemonDetails : PokemonImageCard));

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