<template>
    <div class="flex items-center justify-center border-2 w-1/2 h-4/5 rounded-2xl shadow-2xl">

        <div v-if="data" >
            <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`" alt="Some Pokemon">
        </div>
        <div v-else>
            {{ message }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const name = 'PokemonCard'
defineOptions({
    name,
})

interface Props{
    data?: any
    id?: number
}

defineProps<Props>()

const message = ref('Hello')
</script>