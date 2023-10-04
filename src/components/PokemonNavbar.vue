<template>
  <div class="w-full border-2 border-black p-4 bg-white">
    <nav class="flex justify-between">
      <select name="generation" id="generation">
        <option value="v1">Volvo</option>
        <option value="v2">Saab</option>
        <option value="v3">Mercedes</option>
        <option value="v4">Audi</option>
      </select>
      <div class="flex">
        <search-icon class="text-blue-500 w-8 h-8 pr-1" />
        <input
          class="border-2"
          placeholder="Search"
          :value="modelValue"
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
  modelValue: string;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const handleInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};

</script>
