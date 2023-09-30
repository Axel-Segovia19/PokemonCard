<template>
          <div class="rounded-lg">
            <img  :src="computedImage" alt="Pokemon" class="max-w-full h-auto max-h-96" :class="{'drop-shadow-[0_0px_10px_rgba(0,0,0,2)]': computedImage !== questionMark }">
          </div>
</template>
<script setup lang="ts">
import questionMark from '../assets/questionMark.png'
import { computed, ComputedRef } from 'vue';
defineOptions({
  name: 'PokemonImageCard',
});
const props = defineProps({
  image: {
    type: String
  }
})
const computedImage: ComputedRef<string> = computed(()=> props.image || questionMark)
</script>