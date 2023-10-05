<template>
  <div class="w-full border-2 border-black p-4 bg-white">
    <nav class="flex justify-between">
      <select :value="selectedRegion" name="generation" id="generation"
      @input="handleSelect"
      >
        <option value="2">Kanto</option>
        <option value="3">Johto</option>
        <option value="4">Hoenn</option>
        <option value="5">Sinnoh</option>
        <option value="8">Unova</option>
        <option value="12">Kalos-Central</option>
        <option value="13">Kalos-Coastal</option>
        <option value="14">Kalos-Central</option>
        <option value="16">Alola</option>
        <option value="17">Melemele</option>
        <option value="18">Akala</option>
        <option value="19">Ulaula</option>
        <option value="20">Poni</option>
      </select>
      <div class="flex">
        <search-icon class="text-blue-500 w-8 h-8 pr-1" />
        <input
          class="border-2"
          placeholder="Search"
          :value="searchBar"
          @input="handleInput"
        />
      </div>
    </nav>
  </div>
</template>
<script setup lang="ts">
import SearchIcon from "~icons/mdi/search";
import { defineOptions } from "vue";

defineOptions({
  name: "PokemonNavbar",
});

defineProps<{
  searchBar: string;
  selectedRegion: string;
}>();
const emit = defineEmits<{
  (e: "update:searchBar", value: string): void;
  (e: "update:selectedRegion", value: string): void;
}>();

const handleInput = (event: Event) => {
  emit("update:searchBar", (event.target as HTMLInputElement).value);
};

const handleSelect = (event: Event) => {
  emit("update:selectedRegion", (event.target as HTMLSelectElement).value);
};
</script>
