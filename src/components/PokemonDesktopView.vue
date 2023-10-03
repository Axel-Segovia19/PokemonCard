<template>
      <pokemon-image-card :image="pokemonImage" />
      <pokemon-details :pokemon="selectedPokemon" />
</template>

<script setup lang="ts">
import PokemonImageCard from "./PokemonImageCard.vue";
import PokemonDetails from "./PokemonDetails.vue";
import { Pokemon } from "../Type";

defineProps<{
  pokemonImage: string;
  selectedPokemon: Pokemon;
}>();
</script>

