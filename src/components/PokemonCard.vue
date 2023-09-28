<template>
          <div class="rounded-lg">
            <img  :src="computedImage" alt="Pokemon" class="max-w-full h-auto max-h-96">
          </div>
</template>
<script setup lang="ts">
import questionMark from '../assets/questionMark.png'
import { computed, ComputedRef } from 'vue';
defineOptions({
  name: 'PokemonCard',
});
const props = defineProps({
  image: {
    type: String
  }
})
const computedImage: ComputedRef<string> = computed(()=> props.image || questionMark)
</script>

<style scoped>
.image-background{
  background: repeating-linear-gradient(180deg, white 0%,white 5%, #ADD8E6 5%, #ADD8E6 10%);
}
</style>