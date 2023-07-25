
<template>
  <div class="flex flex-col justify-center items-center h-screen w-screen">
    <pokemon-card :data="testData" :id="randomID"/>
    <button class="w-1/3 h-24 border-2 rounded-lg mt-2 hover:bg-slate-400 transition-colors duration-300" @click="test">Click ME</button>
  </div>
</template>

<script setup lang="ts">
import PokemonCard from './components/PokemonCard.vue'
import { ref ,onMounted} from 'vue';
import axios from 'axios'
const testData = ref()
const randomID = ref()
const test = async () => {
  randomID.value = Math.floor(Math.random()*1018)+1
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomID.value}`)
  testData.value = data
  console.log(testData.value)
}

onMounted(()=> test())

</script>