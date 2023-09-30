<template>
  <div
          class="flex items-center rounded-tl-full rounded-bl-full pl-2 gap-x-2 mt-2 hover:bg-blue-300"
        >
          <span>
            <img
              class="w-12 h-12"
              :src="getSprite(pokemon)"
              alt="pokemonSprite"
            />
          </span>
          <span>
            No.{{ pokemon?.entry_number }}
            {{ upperCaseFirstLetter(pokemon?.pokemon_species.name) }}
          </span>
        </div>
</template>

<script setup lang="ts">
import { upperCaseFirstLetter, getSprite } from '../Helpers';
defineOptions({
  name: 'PokemonListOption'
})
defineProps({
  pokemon:{
    type: Object
  }
})
</script>